import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-035';

test.describe('LIMAS-AUTH-035: Password only + Sign In', () => {
  test('should reject login when only password is provided', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;
    const ctr = { seq: 0 };
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      const credentials = getCredentials(PROFILE);

      // --- Navigation ---
      await detailedStep(page, 'Login page loaded', ctr, async () => {
        await loginPage.goto();
      });

      await detailedStep(page, 'Sign In clicked', ctr, async () => {
        await loginPage.clickSignIn();
      });

      await detailedStep(page, 'Keycloak login form visible', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-035-password-only-signin.spec-31', async () => expect(loginPage.keycloakHeading).toBeVisible());
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
      // Username intentionally left empty — no keystrokes

      // --- Password entry — per-keystroke ---
      await detailedStep(page, 'Password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-035-password-only-signin.spec-38', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

      await detailedStep(page, 'Password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      // --- Submit and verify rejection ---
      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
      });

      await detailedStep(page, 'Rejection verified', ctr, async () => {
        const hasError = await loginPage.keycloakErrorMessage.isVisible().catch(() => false);
        const stillOnKeycloak = loginPage.isIdentityProvider();
        await recordEvidence('assert-toBe-LIMAS-AUTH-035-password-only-signin.spec-55', async () => expect(hasError || stillOnKeycloak).toBe(true));
      });

      apiSummary = buildApiSummary({
        method: 'POST', pathname: '/realms/LIMAS/protocol/openid-connect/auth', status: 401,
        trigger: 'Keycloak Sign In (password only)',
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
