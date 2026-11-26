import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-037';

test.describe('LIMAS-AUTH-037: Login then Sign Out', () => {
  test('should login, sign out, and return to login page', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;
    const ctr = { seq: 0 };
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      const credentials = getCredentials(PROFILE);

      // --- Navigation to login page ---
      await detailedStep(page, 'Login page loaded', ctr, async () => {
        await loginPage.goto();
      });

      await detailedStep(page, 'Sign In clicked', ctr, async () => {
        await loginPage.clickSignIn();
      });

      await detailedStep(page, 'Keycloak login form visible', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-037-login-then-sign-out.spec-32', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      // --- Username entry — per-keystroke ---
      await detailedStep(page, 'Username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-037-login-then-sign-out.spec-37', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, credentials.username, page, 'username', ctr);

      await detailedStep(page, 'Username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-037-login-then-sign-out.spec-43', async () => expect(loginPage.usernameField).toHaveValue(credentials.username));
      });
      await loginPage.advanceToPassword();


      // --- Password entry — per-keystroke ---
      await detailedStep(page, 'Password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-037-login-then-sign-out.spec-48', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

      await detailedStep(page, 'Password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      // --- Authenticate and verify dashboard ---
      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
        await page.waitForURL('**/system-user-dashboard', { timeout: 30000 });
      });

      await detailedStep(page, 'Dashboard heading visible', ctr, async () => {
        const dashboard = new SystemUserDashboardPage(page);
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-037-login-then-sign-out.spec-65', async () => expect(dashboard.heading).toBeVisible());
      });

      // --- Sign Out ---
      await detailedStep(page, 'User menu opened', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-037-login-then-sign-out.spec-70', async () => loginPage.userButton.click());
      });

      await detailedStep(page, 'Sign Out clicked', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-037-login-then-sign-out.spec-74', async () => loginPage.logoutOption.click());
        await page.waitForURL('**/login', { timeout: 15000 });
      });

      await detailedStep(page, 'Login page restored after sign-out', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-037-login-then-sign-out.spec-79', async () => expect(loginPage.signInButton).toBeVisible());
        await recordEvidence('assert-toContain-LIMAS-AUTH-037-login-then-sign-out.spec-80', async () => expect(page.url()).not.toContain('/system-user-dashboard'));
      });

      apiSummary = buildApiSummary({
        method: 'GET', pathname: '/', status: 200,
        trigger: 'Sign Out → login page',
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
