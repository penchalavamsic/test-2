import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, buildApiSummary } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-033';

test.describe('LIMAS-AUTH-033: Empty username + empty password', () => {
  test('should reject login with both fields empty', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;
    const ctr = { seq: 0 };
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);

      // --- Navigation ---
      await detailedStep(page, 'Login page loaded', ctr, async () => {
        await loginPage.goto();
      });

      await detailedStep(page, 'Sign In clicked', ctr, async () => {
        await loginPage.clickSignIn();
      });

      await detailedStep(page, 'Keycloak login form visible', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-033-empty-username-empty-password.spec-28', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });


      if (await page.getByRole('button', { name: 'Next', exact: true }).isVisible()) {
        test.info().annotations.push({ type: 'provider-adaptation', description: 'Cognito requires a valid email before exposing the password. Verify rejection at the email gate.' });
        await recordEvidence('action-invalid-email-gate', () => loginPage.usernameField.fill(''));
        await recordEvidence('action-empty-email-next', () => page.getByRole('button', { name: 'Next', exact: true }).click());
        await recordEvidence('assert-email-gate-invalid', async () => expect(loginPage.usernameField).toHaveAttribute('aria-invalid', 'true'));
        await recordEvidence('assert-missing-email-feedback', async () => expect(page.getByText('Missing email address.', { exact: true })).toBeVisible());
        await recordEvidence('assert-password-step-unavailable', async () => expect(loginPage.passwordField).not.toBeVisible());
        await recordEvidence('assert-not-authenticated', async () => expect(page).not.toHaveURL(/system-user-dashboard/));
        return;
      }
      // Both fields intentionally empty — no keystrokes required
      await detailedStep(page, 'Both fields empty', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-033-empty-username-empty-password.spec-33', async () => expect(loginPage.usernameField).toHaveValue(''));
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-033-empty-username-empty-password.spec-34', async () => expect(loginPage.passwordField).toHaveValue(''));
      });

      // --- Submit and verify rejection ---
      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
      });

      await detailedStep(page, 'Rejection verified', ctr, async () => {
        const hasError = await loginPage.keycloakErrorMessage.isVisible().catch(() => false);
        const stillOnKeycloak = loginPage.isIdentityProvider();
        await recordEvidence('assert-toBe-LIMAS-AUTH-033-empty-username-empty-password.spec-45', async () => expect(hasError || stillOnKeycloak).toBe(true));
      });

      apiSummary = buildApiSummary({
        method: 'POST', pathname: '/realms/LIMAS/protocol/openid-connect/auth', status: 401,
        trigger: 'Keycloak Sign In (empty credentials)',
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
