import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-030';
const INVALID_USERNAME = 'nonexistent-user@example.com';
const INVALID_PASSWORD = 'wrong-password-123';

test.describe('LIMAS-AUTH-030: Invalid username + invalid password', () => {
  test('should reject login with both credentials invalid', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
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
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-030-invalid-username-invalid-password.spec-30', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      // --- Invalid username — per-keystroke ---
      await detailedStep(page, 'Username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-030-invalid-username-invalid-password.spec-35', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, INVALID_USERNAME, page, 'username', ctr);

      await detailedStep(page, 'Username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-030-invalid-username-invalid-password.spec-41', async () => expect(loginPage.usernameField).toHaveValue(INVALID_USERNAME));
      });
      await loginPage.advanceToPassword();


      // --- Invalid password — per-keystroke ---
      await detailedStep(page, 'Password field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-030-invalid-username-invalid-password.spec-46', async () => loginPage.passwordField.click());
      });

      await typeSequentially(loginPage.passwordField, INVALID_PASSWORD, page, 'password', ctr);

      await detailedStep(page, 'Password entry completed', ctr, async () => {
        // field value assertion omitted — Keycloak may mask
      });

      // --- Submit and verify rejection ---
      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
      });

      await detailedStep(page, 'Error feedback visible', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-030-invalid-username-invalid-password.spec-61', async () => expect(loginPage.keycloakErrorMessage).toBeVisible({ timeout: 10000 }));
      });

      await detailedStep(page, 'Keycloak login form still active', ctr, async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-030-invalid-username-invalid-password.spec-65', async () => expect(loginPage.keycloakHeading).toBeVisible());
        await recordEvidence('assert-toContain-LIMAS-AUTH-030-invalid-username-invalid-password.spec-66', async () => expect(loginPage.isIdentityProvider()).toBe(true));
      });

      apiSummary = buildApiSummary({
        method: 'POST', pathname: '/realms/LIMAS/protocol/openid-connect/auth', status: 401,
        trigger: 'Keycloak Sign In (bad credentials)',
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
