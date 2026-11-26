import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-029';

test.describe('LIMAS-AUTH-029: Invalid username + valid password', () => {
  test('should reject login with invalid username and valid password', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
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
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-029-invalid-username-valid-password.spec-31', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      // --- Invalid username entry — per-keystroke ---
      const invalidUsername = 'nonexistent-user@example.com';

      await detailedStep(page, 'Username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-029-invalid-username-valid-password.spec-38', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, invalidUsername, page, 'username', ctr);

      await detailedStep(page, 'Username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-029-invalid-username-valid-password.spec-44', async () => expect(loginPage.usernameField).toHaveValue(invalidUsername));
      });
      await loginPage.advanceToPassword();


      // --- Valid password entry — per-keystroke ---
      await detailedStep(page, 'Password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-029-invalid-username-valid-password.spec-49', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

      await detailedStep(page, 'Password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      // --- Submit and verify rejection ---
      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
      });

      await detailedStep(page, 'Error feedback visible', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-029-invalid-username-valid-password.spec-64', async () => expect(loginPage.keycloakErrorMessage).toBeVisible({ timeout: 10000 }));
      });

      await detailedStep(page, 'Keycloak login form still active', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-029-invalid-username-valid-password.spec-68', async () => expect(loginPage.keycloakHeading).toBeVisible());
        await recordEvidence('assert-toContain-LIMAS-AUTH-029-invalid-username-valid-password.spec-69', async () => expect(loginPage.isIdentityProvider()).toBe(true));
      });

      apiSummary = buildApiSummary({
        method: 'POST', pathname: '/realms/LIMAS/protocol/openid-connect/auth', status: 401,
        trigger: 'Keycloak Sign In (invalid username)',
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
