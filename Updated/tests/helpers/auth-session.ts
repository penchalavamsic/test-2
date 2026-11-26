import fs from 'fs';
import path from 'path';
import type { Browser, BrowserContext, Page, TestInfo } from '@playwright/test';
import { getProfile, performKeycloakLogin, resolveProfileName } from './auth';
import { applicationUrl, envNumber } from './settings';
import { captureEvidence } from './step-evidence';

export class AuthBlockedError extends Error {
  constructor(message: string) {
    super(`Authentication blocked: ${message}`);
    this.name = 'AuthBlockedError';
  }
}

export type AuthSnapshot = {
  state: Awaited<ReturnType<BrowserContext['storageState']>>;
  session: Record<string, string>;
  origin: string;
  expiresAt: number | null;
};

export function tokenExpiry(session: Record<string, string>): number | null {
  const expiries: number[] = [];
  for (const [key, value] of Object.entries(session)) {
    if (!key.startsWith('oidc.user:')) continue;
    try {
      const user = JSON.parse(value);
      if (typeof user.expires_at === 'number' && Number.isFinite(user.expires_at)) {
        expiries.push(user.expires_at * 1000);
      }
    } catch { /* Unknown expiry is validated through UI navigation. */ }
  }
  return expiries.length ? Math.min(...expiries) : null;
}

export function isExpiring(expiresAt: number | null, now = Date.now()): boolean {
  return expiresAt !== null && expiresAt <= now + envNumber('LIMAS_AUTH_EXPIRY_MARGIN_MS', 30000);
}

export async function restoreSession(context: BrowserContext, snapshot: AuthSnapshot): Promise<void> {
  await context.addInitScript(({ origin, session }) => {
    // Never inject application tokens into Keycloak, frames on other origins,
    // or overwrite tokens the application has refreshed on a later navigation.
    if (location.origin !== origin) return;
    for (const [key, value] of Object.entries(session)) {
      if (sessionStorage.getItem(key) === null) sessionStorage.setItem(key, value);
    }
  }, { origin: snapshot.origin, session: snapshot.session });
}

export async function captureSession(page: Page): Promise<AuthSnapshot> {
  const session = await page.evaluate(() => Object.fromEntries(
    Object.keys(sessionStorage).map(key => [key, sessionStorage.getItem(key)!]),
  ));
  return {
    state: await page.context().storageState(), session,
    origin: new URL(page.url()).origin, expiresAt: tokenExpiry(session),
  };
}

/** Per-worker state avoids shared refresh-token rotation and file write races. */
export class AuthSession {
  private snapshot?: AuthSnapshot;
  private pending?: Promise<AuthSnapshot>;
  constructor(private browser: Browser, private workerIndex: number) {}

  async current(info?: TestInfo): Promise<AuthSnapshot> {
    if (this.snapshot && this.snapshot.expiresAt !== null && !isExpiring(this.snapshot.expiresAt)) return this.snapshot;
    if (!this.pending) this.pending = this.acquire(info).finally(() => { this.pending = undefined; });
    return this.pending;
  }

  private async acquire(info?: TestInfo): Promise<AuthSnapshot> {
    const profile = resolveProfileName();
    getProfile(profile); // Validate before constructing file paths.
    const baseURL = applicationUrl();
    const authDir = path.resolve(__dirname, '../../.auth');
    // Only worker zero consumes the setup token. Other workers obtain their own
    // login sessions, so concurrent refreshes cannot invalidate one another.
    if (!this.snapshot && this.workerIndex === 0) {
      try {
        const meta = JSON.parse(fs.readFileSync(path.join(authDir, `${profile}.meta.json`), 'utf8'));
        if (meta.profile === profile && new URL(meta.baseURL).href === baseURL.href) {
          const session = JSON.parse(fs.readFileSync(path.join(authDir, `${profile}.session.json`), 'utf8'));
          const state = JSON.parse(fs.readFileSync(path.join(authDir, `${profile}.json`), 'utf8'));
          const expiresAt = tokenExpiry(session);
          if (expiresAt !== null && !isExpiring(expiresAt)) {
            return this.snapshot = { state, session, origin: baseURL.origin, expiresAt };
          }
        }
      } catch { /* Missing/stale setup state is replaced by a fresh login. */ }
    }
    const context = await this.browser.newContext({ baseURL: baseURL.href, storageState: { cookies: [], origins: [] } });
    const started = Date.now();
    let result = 'failed';
    try {
      const page = await context.newPage();
      page.setDefaultTimeout(envNumber('LIMAS_AUTH_TIMEOUT_MS', 60000, 1));
      await page.goto(baseURL.href);
      await performKeycloakLogin(page, profile);
      const snapshot = await captureSession(page);
      if (isExpiring(snapshot.expiresAt)) {
        throw new AuthBlockedError('a fresh token is already within LIMAS_AUTH_EXPIRY_MARGIN_MS; check the configured margin and server token lifetime');
      }
      this.snapshot = snapshot;
      result = 'passed';
      return snapshot;
    } catch (error) {
      if (error instanceof AuthBlockedError) throw error;
      // Do not include credential-fill errors or token-bearing URLs in diagnostics.
      throw new AuthBlockedError(`login did not complete (${error instanceof Error ? error.name : 'unknown error'}). Check the environment, credentials and LIMAS_AUTH_TIMEOUT_MS.`);
    } finally {
      if (info) {
        if (result === 'failed' && context.pages()[0]) await captureEvidence('authentication-refresh-failure', info, context.pages()[0]);
        await info.attach('Authentication refresh', { body: JSON.stringify({ result, durationMs: Date.now() - started, profile,
          timeoutMs: envNumber('LIMAS_AUTH_TIMEOUT_MS', 60000, 1) }), contentType: 'application/json' });
      }
      await context.close();
    }
  }
}
