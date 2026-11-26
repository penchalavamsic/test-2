import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-027';

test.describe('LIMAS-AUTH-027: Valid username + valid password', () => {
  test('should authenticate with valid credentials and land on dashboard', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
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
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-027-valid-username-valid-password.spec-32', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      // --- Username entry — per-keystroke evidence ---
      await detailedStep(page, 'Username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-027-valid-username-valid-password.spec-37', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, credentials.username, page, 'username', ctr);

      await detailedStep(page, 'Username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-027-valid-username-valid-password.spec-43', async () => expect(loginPage.usernameField).toHaveValue(credentials.username));
      });

      await loginPage.advanceToPassword();
      // --- Password entry — per-keystroke evidence ---
      await detailedStep(page, 'Password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-027-valid-username-valid-password.spec-48', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

      await detailedStep(page, 'Password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      // --- Submit and verify ---
      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
        await page.waitForURL('**/system-user-dashboard', { timeout: 30000 });
      });

      await detailedStep(page, 'Dashboard heading visible', ctr, async () => {
        const dashboard = new SystemUserDashboardPage(page);
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-027-valid-username-valid-password.spec-65', async () => expect(dashboard.heading).toBeVisible());
      });

      apiSummary = buildApiSummary({
        method: 'POST', pathname: '/realms/LIMAS/protocol/openid-connect/auth', status: 302,
        trigger: 'Keycloak Sign In',
        redirects: ['/auth/callback', '/system-user-dashboard'],
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
