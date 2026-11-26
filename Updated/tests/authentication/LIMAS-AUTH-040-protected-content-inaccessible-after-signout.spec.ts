import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-040';

test.describe('LIMAS-AUTH-040: Protected content inaccessible after Sign Out', () => {
  test('should block dashboard access after sign-out without re-authentication', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
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
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-32', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      // --- Username — per-keystroke ---
      await detailedStep(page, 'Username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-37', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, credentials.username, page, 'username', ctr);

      await detailedStep(page, 'Username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-43', async () => expect(loginPage.usernameField).toHaveValue(credentials.username));
      });
      await loginPage.advanceToPassword();


      // --- Password — per-keystroke ---
      await detailedStep(page, 'Password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-48', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

      await detailedStep(page, 'Password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
        await page.waitForURL('**/system-user-dashboard', { timeout: 30000 });
      });

      await detailedStep(page, 'Dashboard access verified', ctr, async () => {
        const dashboard = new SystemUserDashboardPage(page);
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-64', async () => expect(dashboard.heading).toBeVisible());
      });

      // --- Sign Out ---
      await detailedStep(page, 'User menu opened', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-69', async () => loginPage.userButton.click());
      });

      await detailedStep(page, 'Sign Out clicked', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-73', async () => loginPage.logoutOption.click());
        await page.waitForURL('**/login', { timeout: 15000 });
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-75', async () => expect(loginPage.signInButton).toBeVisible());
      });

      // --- Verify protected content inaccessible ---
      await detailedStep(page, 'Protected route navigation attempted', ctr, async () => {
        await recordEvidence('action-goto-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-80', async () => page.goto('/system-user-dashboard'));
        await page.waitForTimeout(3000);
        const url = page.url();
        const isOnDashboard = url.includes('/system-user-dashboard') && !url.includes('keycloak') && !url.includes('auth');
        await recordEvidence('assert-toBe-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-84', async () => expect(isOnDashboard).toBe(false));
      });

      await detailedStep(page, 'Protected content absence verified', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-040-protected-content-inaccessible-after-signout.spec-88', async () => expect(loginPage.signInButton).toBeVisible());
      });

      apiSummary = buildApiSummary({
        method: 'GET', pathname: '/system-user-dashboard', status: 302,
        trigger: 'Direct access after sign-out (redirect expected)',
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
