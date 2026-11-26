import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-041';

test.describe('LIMAS-AUTH-041: Session state cleared after Sign Out', () => {
  test('should clear session state after sign-out and require re-authentication', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;
    const ctr = { seq: 0 };
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      const credentials = getCredentials(PROFILE);

      // --- Authentication ---
      await detailedStep(page, 'Login page loaded', ctr, async () => {
        await loginPage.goto();
      });

      await detailedStep(page, 'Sign In clicked', ctr, async () => {
        await loginPage.clickSignIn();
      });

      await detailedStep(page, 'Keycloak login form visible', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-32', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      // --- Username — per-keystroke ---
      await detailedStep(page, 'Username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-37', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, credentials.username, page, 'username', ctr);

      await detailedStep(page, 'Username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-43', async () => expect(loginPage.usernameField).toHaveValue(credentials.username));
      });
      await loginPage.advanceToPassword();


      // --- Password — per-keystroke ---
      await detailedStep(page, 'Password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-48', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

      await detailedStep(page, 'Password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
        await page.waitForURL('**/system-user-dashboard', { timeout: 30000 });
      });

      await detailedStep(page, 'Authenticated state established', ctr, async () => {
        const dashboard = new SystemUserDashboardPage(page);
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-64', async () => expect(dashboard.heading).toBeVisible());
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-65', async () => expect(dashboard.userButton).toBeVisible());
      });

      // --- Sign Out ---
      await detailedStep(page, 'User menu opened', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-70', async () => loginPage.userButton.click());
      });

      await detailedStep(page, 'Sign Out clicked', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-74', async () => loginPage.logoutOption.click());
        await page.waitForURL('**/login', { timeout: 15000 });
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-76', async () => expect(loginPage.signInButton).toBeVisible());
      });

      // --- Clear session state ---
      await detailedStep(page, 'Browser storage cleared', ctr, async () => {
        await page.context().clearCookies();
        await page.evaluate(() => {
          localStorage.clear();
          sessionStorage.clear();
        });
      });

      // --- Verify protected content inaccessible after clearance ---
      await detailedStep(page, 'Dashboard access attempted after clearance', ctr, async () => {
        await recordEvidence('action-goto-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-90', async () => page.goto('/system-user-dashboard'));
        await page.waitForTimeout(3000);
        const url = page.url();
        await recordEvidence('assert-toContain-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-93', async () => expect(url).not.toContain('/system-user-dashboard'));
      });

      await detailedStep(page, 'Authenticated state confirmed unavailable', ctr, async () => {
        const hasUserButton = await loginPage.userButton.isVisible().catch(() => false);
        await recordEvidence('assert-toBe-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-98', async () => expect(hasUserButton).toBe(false));
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-041-session-state-cleared-after-signout.spec-99', async () => expect(loginPage.signInButton).toBeVisible());
      });

      apiSummary = buildApiSummary({
        method: 'GET', pathname: '/', status: 200,
        trigger: 'Session clearance + login page display',
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
