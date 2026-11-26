import { test as base, expect } from './observed-test';
import { AuthSession, AuthBlockedError, restoreSession, type AuthSnapshot } from '../helpers/auth-session';
import { captureEvidence } from '../helpers/step-evidence';
import { envNumber } from '../helpers/settings';

export { expect, AuthBlockedError };
export type SystemUserDashboardFixtures = { authenticatedPage: { url: string } };
export const captureStepScreenshot = (page: import('@playwright/test').Page, info: import('@playwright/test').TestInfo, label: string) =>
  captureEvidence(label, info, page);

export const test = base.extend<SystemUserDashboardFixtures & { authSnapshot: AuthSnapshot }, { authSession: AuthSession }>({
  authSession: [async ({ browser }, use, workerInfo) => {
    await use(new AuthSession(browser, workerInfo.parallelIndex));
  }, { scope: 'worker' }],
  authSnapshot: [async ({ authSession }, use, info) => {
    await use(await authSession.current(info));
  }, { timeout: envNumber('LIMAS_AUTH_SETUP_TIMEOUT_MS', 180000, 1) }],
  storageState: async ({ authSnapshot }, use) => {
    // Renew before starting a test, never replay an in-progress functional action.
    await use(authSnapshot.state);
  },
  context: async ({ context, authSnapshot }, use) => {
    await restoreSession(context, authSnapshot);
    await use(context);
  },
  page: async ({ page }, use) => {
    await page.goto('/system-user-dashboard');
    const heading = page.getByRole('heading', { name: 'System User Dashboard', level: 1 });
    const signIn = page.getByRole('button', { name: 'Sign In', exact: true });
    const timeout = envNumber('LIMAS_AUTH_TIMEOUT_MS', 60000, 1);
    const outcome = await Promise.any([
      heading.waitFor({ state: 'visible', timeout }).then(() => 'dashboard'),
      signIn.waitFor({ state: 'visible', timeout }).then(() => 'sign-in'),
    ]).catch(() => 'timeout');
    if (outcome === 'sign-in') throw new AuthBlockedError('redirected to sign-in before the test started');
    if (outcome === 'timeout') throw new Error('Dashboard bootstrap timed out without a confirmed sign-in redirect. Inspect application loading and navigation; this is not automatically an authentication expiry.');
    await use(page);
  },
  authenticatedPage: async ({ page }, use) => { await use({ url: page.url() }); },
});
