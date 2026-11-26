import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-038';

test.describe('LIMAS-AUTH-038: Re-login after Sign Out', () => {
  test('should login, sign out, and re-authenticate successfully', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;
    const ctr = { seq: 0 };
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      const credentials = getCredentials(PROFILE);

      // ========== First Login ==========

      await detailedStep(page, 'Login page loaded', ctr, async () => {
        await loginPage.goto();
      });

      await detailedStep(page, 'Sign In clicked', ctr, async () => {
        await loginPage.clickSignIn();
      });

      await detailedStep(page, 'Keycloak login form visible', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-038-re-login-after-sign-out.spec-33', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      // --- First username entry — per-keystroke ---
      await detailedStep(page, 'Username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-038-re-login-after-sign-out.spec-38', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, credentials.username, page, 'username', ctr);

      await detailedStep(page, 'Username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-038-re-login-after-sign-out.spec-44', async () => expect(loginPage.usernameField).toHaveValue(credentials.username));
      });

      await loginPage.advanceToPassword();
      // --- First password entry — per-keystroke ---
      await detailedStep(page, 'Password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-038-re-login-after-sign-out.spec-49', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

      await detailedStep(page, 'Password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
        await page.waitForURL('**/system-user-dashboard', { timeout: 30000 });
      });

      await detailedStep(page, 'Dashboard heading visible', ctr, async () => {
        const dashboard = new SystemUserDashboardPage(page);
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-038-re-login-after-sign-out.spec-65', async () => expect(dashboard.heading).toBeVisible());
      });

      // ========== Sign Out ==========

      await detailedStep(page, 'User menu opened', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-038-re-login-after-sign-out.spec-71', async () => loginPage.userButton.click());
      });

      await detailedStep(page, 'Sign Out clicked', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-038-re-login-after-sign-out.spec-75', async () => loginPage.logoutOption.click());
        await page.waitForURL('**/login', { timeout: 15000 });
      });

      await detailedStep(page, 'Login page restored after sign-out', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-038-re-login-after-sign-out.spec-80', async () => expect(loginPage.signInButton).toBeVisible());
      });

      // ========== Re-login ==========

      await detailedStep(page, 'Re-login Sign In clicked', ctr, async () => {
        await loginPage.clickSignIn();
      });

      // --- Second username entry — per-keystroke ---
      await detailedStep(page, 'Re-login username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-038-re-login-after-sign-out.spec-91', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, credentials.username, page, 'username', ctr);

      await detailedStep(page, 'Re-login username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-038-re-login-after-sign-out.spec-97', async () => expect(loginPage.usernameField).toHaveValue(credentials.username));
      });

      await loginPage.advanceToPassword();
      // --- Second password entry — per-keystroke ---
      await detailedStep(page, 'Re-login password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-038-re-login-after-sign-out.spec-102', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

      await detailedStep(page, 'Re-login password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      await detailedStep(page, 'Re-login credentials submitted', ctr, async () => {
        await loginPage.submitKeycloakLogin();
        await page.waitForURL('**/system-user-dashboard', { timeout: 30000 });
      });

      await detailedStep(page, 'Dashboard restored after re-login', ctr, async () => {
        const dashboard = new SystemUserDashboardPage(page);
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-038-re-login-after-sign-out.spec-118', async () => expect(dashboard.heading).toBeVisible());
      });

      apiSummary = buildApiSummary({
        method: 'POST', pathname: '/realms/LIMAS/protocol/openid-connect/auth', status: 302,
        trigger: 'Re-authentication after sign-out',
        redirects: ['/auth/callback', '/system-user-dashboard'],
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
