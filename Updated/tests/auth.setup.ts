import { recordEvidence } from './helpers/step-evidence';
import { test as setup, expect } from './fixtures/observed-test';
import { performKeycloakLogin, resolveProfileName, getProfile } from './helpers/auth';
import path from 'path';
import fs from 'fs';

/**
 * Global authentication setup for System User Dashboard batches.
 *
 * Signs in once for the configured access profile and saves the complete
 * authentication state so functional tests do not repeat UI sign-in.
 *
 * Saved state includes:
 *   1. Playwright storageState (cookies + localStorage via the project config)
 *   2. sessionStorage (LIMAS OIDC user session — not captured by storageState)
 *   3. Expiry metadata extracted from the OIDC token when available
 *   4. Profile/environment metadata for preflight validation
 *
 * The state is saved ONLY after:
 *   - Keycloak has fully redirected back to LIMAS
 *   - The System User Dashboard heading is visible
 *   - The page URL is the authenticated LIMAS route
 */

const AUTH_DIR = path.resolve(__dirname, '..', '.auth');

setup('authenticate for System User Dashboard', async ({ page, baseURL }) => {
  const profile = resolveProfileName();
  getProfile(profile);

  const stateFile = path.join(AUTH_DIR, `${profile}.json`);
  const metaFile = path.join(AUTH_DIR, `${profile}.meta.json`);
  const sessionFile = path.join(AUTH_DIR, `${profile}.session.json`);

  fs.mkdirSync(AUTH_DIR, { recursive: true });

  // Always start from a clean state — do not reuse old sessions
  await page.context().clearCookies();

  await recordEvidence('action-goto-auth.setup-39', async () => page.goto(baseURL!));

  // Full Keycloak UI login — waits for the complete LIMAS redirect
  await performKeycloakLogin(page, profile);

  // Confirm authenticated LIMAS dashboard
  await recordEvidence('assert-toHaveURL-auth.setup-45', async () => expect(page).toHaveURL(/system-user-dashboard/));
  await recordEvidence('assert-toBeVisible-auth.setup-46', async () => expect(
    page.getByRole('heading', { name: 'System User Dashboard', level: 1 }),
  ).toBeVisible());

  // ── 1. Save storageState (cookies + localStorage) ──────────────────
  await page.context().storageState({ path: stateFile });

  // ── 2. Capture sessionStorage ───────────────────────────────────────
  const sessionData: Record<string, string> = await page.evaluate(() => {
    const store: Record<string, string> = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)!;
      store[key] = sessionStorage.getItem(key)!;
    }
    return store;
  });
  fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2), 'utf-8');

  // ── 3. Extract OIDC token expiry ────────────────────────────────────
  let tokenExpiry: string | null = null;
  let tokenExpiryMs: number | null = null;
  try {
    const oidcToken = await page.evaluate(() => {
      // LIMAS stores the OIDC user under a key starting with 'oidc.user:'
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)!;
        if (key.startsWith('oidc.user:')) {
          return sessionStorage.getItem(key);
        }
      }
      return null;
    });
    if (oidcToken) {
      const parsed = JSON.parse(oidcToken);
      if (parsed.expires_at) {
        tokenExpiryMs = typeof parsed.expires_at === 'number' ? parsed.expires_at * 1000 : Date.parse(parsed.expires_at);
        tokenExpiry = new Date(tokenExpiryMs).toISOString();
      }
    }
  } catch {
    // OIDC token not available or unparseable — expiry will be unknown
  }

  // ── 4. Save metadata ────────────────────────────────────────────────
  const generatedAt = new Date().toISOString();
  const meta = {
    generatedAt,
    profile,
    baseURL,
    finalUrl: page.url(),
    browserChannel: process.env.PLAYWRIGHT_BROWSER_CHANNEL || 'msedge',
    stateFile,
    sessionFile,
    sessionKeys: Object.keys(sessionData).length,
    tokenExpiry,
    tokenExpiryMs,
  };
  fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2), 'utf-8');

  // ── 5. Log summary (no credentials/tokens) ──────────────────────────
  console.log(`Auth state saved for ${profile}`);
  console.log(`  storageState   : ${stateFile}`);
  console.log(`  sessionStorage : ${sessionFile} (${Object.keys(sessionData).length} keys)`);
  console.log(`  metadata       : ${metaFile}`);
  if (tokenExpiry) {
    const remaining = tokenExpiryMs ? Math.round((tokenExpiryMs - Date.now()) / 60000) : null;
    console.log(`  token expiry   : ${tokenExpiry}${remaining !== null ? ` (${remaining} min remaining)` : ''}`);
  } else {
    console.log(`  token expiry   : unknown (could not extract from OIDC session)`);
  }
});
