import { recordEvidence } from './step-evidence';
import { Page, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { envNumber } from './settings';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

interface AccessProfile {
  usernameEnv: string;
  passwordEnv: string;
  expectedTabs: string[];
}

interface AccessProfiles {
  [key: string]: AccessProfile;
}

function loadAccessProfiles(): AccessProfiles {
  const profilesPath = path.resolve(__dirname, '..', '..', 'config', 'access-profiles.json');
  const raw = fs.readFileSync(profilesPath, 'utf-8');
  return JSON.parse(raw);
}

export function getProfile(profileName: string): AccessProfile {
  const profiles = loadAccessProfiles();
  const profile = profiles[profileName];
  if (!profile) {
    throw new Error(`Access profile "${profileName}" not found in access-profiles.json`);
  }
  return profile;
}

export function resolveProfileName(override?: string): string {
  const fromEnv = override ?? process.env.LIMAS_ACCESS_PROFILE;
  if (fromEnv) return fromEnv;
  const fallback = process.env.LIMAS_DEFAULT_ACCESS_PROFILE;
  if (fallback) return fallback;
  throw new Error(
    'No access profile configured. Set LIMAS_ACCESS_PROFILE or LIMAS_DEFAULT_ACCESS_PROFILE in .env',
  );
}

export function getCredentials(profileName: string): { username: string; password: string } {
  const profile = getProfile(profileName);
  const username = process.env[profile.usernameEnv];
  const password = process.env[profile.passwordEnv];
  if (!username || !password) {
    throw new Error(
      `Credentials not found for profile "${profileName}". ` +
      `Ensure ${profile.usernameEnv} and ${profile.passwordEnv} are set in .env`,
    );
  }
  return { username, password };
}

/**
 * Perform a full Keycloak login flow, handling both outcomes after
 * clicking the LIMAS **Sign In** button:
 *
 *   1. Credential page displayed — the Keycloak login form is visible.
 *      Fill credentials, submit, wait for the authenticated LIMAS route.
 *   2. Existing Keycloak SSO session — Keycloak skips the credential page
 *      and redirects directly through /auth/callback to LIMAS.
 *      Do not wait for credential fields; wait for the callback flow
 *      to complete and confirm the final authenticated route + heading.
 *
 * This helper is limited to authentication-setup and authentication-suite
 * coverage. System User Dashboard functional tests must NOT invoke it.
 */
export async function performKeycloakLogin(page: Page, profileName: string): Promise<void> {
  const { username, password } = getCredentials(profileName);

  // Click "Sign In" on the LIMAS landing page
  await recordEvidence('action-click-auth-75', async () => page.getByRole('button', { name: 'Sign In' }).click());

  // After clicking Sign In, Keycloak may either:
  //   (a) display its credential form, or
  //   (b) redirect straight to LIMAS via SSO → /auth/callback
  //
  // Wait for whichever happens first.
  const timeout = envNumber('LIMAS_AUTH_TIMEOUT_MS', 60000, 1);
  const credentialPagePromise = page
    .getByRole('textbox', { name: /^(Username or email|Email address)$/i })
    .waitFor({ state: 'visible', timeout })
    .then(() => 'credential-page' as const);

  const ssoRedirectPromise = page
    .waitForURL('**/system-user-dashboard', { timeout })
    .then(() => 'sso-redirect' as const);

  // A transient callback may finish before a URL waiter is registered. Observe
  // the final route, and do not let one branch timing out reject the other.
  const outcome = await Promise.any([credentialPagePromise, ssoRedirectPromise]);

  if (outcome === 'credential-page') {
    // Wait for provider scripts before filling a server-rendered form.
    await page.waitForLoadState('load');
    // Keycloak or Cognito displayed the credential form — fill and submit
    await recordEvidence('action-fill-auth-98', async () => page.getByRole('textbox', { name: /^(Username or email|Email address)$/i }).fill(username));
    // Cognito managed login collects the email before displaying the password.
    const next = page.getByRole('button', { name: 'Next', exact: true });
    if (await next.isVisible()) {
      await recordEvidence('action-cognito-email-blur', () => page.getByRole('textbox', { name: 'Email address', exact: true }).press('Tab'));
      await recordEvidence('action-cognito-next', () => next.click());
      // A provider hydration reset can discard the first email input. Recover
      // only this explicit pre-password validation state, never replay a test.
      const passwordReady = await Promise.any([
        page.getByLabel('Password', { exact: true }).waitFor({ state: 'visible', timeout }).then(() => true),
        page.getByText('Missing email address.', { exact: true }).waitFor({ state: 'visible', timeout }).then(() => false),
      ]);
      if (!passwordReady) {
        await recordEvidence('action-cognito-refill-email', () => page.getByRole('textbox', { name: 'Email address', exact: true }).fill(username));
        await recordEvidence('action-cognito-next-after-hydration', () => next.click());
      }
    }
    await recordEvidence('action-fill-auth-99', async () => page.getByLabel('Password', { exact: true }).fill(password));

    // Submit and wait for the full Keycloak → LIMAS redirect cycle
    await Promise.all([
      page.waitForURL('**/system-user-dashboard', { timeout }),
      recordEvidence('action-click-auth-104', async () => page.getByRole('button', { name: /^(Sign In|Continue)$/i }).click()),
    ]);
  } else {
    // SSO session exists — Keycloak redirected directly to /auth/callback.
    // Wait for the callback flow to finish and land on the dashboard.
    await page.waitForURL('**/system-user-dashboard', { timeout });
  }

  // Confirm authenticated LIMAS dashboard
  await recordEvidence('assert-toBeVisible-auth-113', async () => expect(
    page.getByRole('heading', { name: 'System User Dashboard', level: 1 }),
  ).toBeVisible({ timeout: 15000 }));
}
