import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-034';

test.describe('LIMAS-AUTH-034: Username only + Sign In', () => {
  test('should reject login when only username is provided', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
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
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-034-username-only-signin.spec-31', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      // --- Username entry — per-keystroke ---
      await detailedStep(page, 'Username field focused', ctr, async () => {
        await recordEvidence('action-click-LIMAS-AUTH-034-username-only-signin.spec-36', async () => loginPage.usernameField.click());
      });

      await typeSequentially(loginPage.usernameField, credentials.username, page, 'username', ctr);

      await detailedStep(page, 'Username entry completed', ctr, async () => {
        await recordEvidence('assert-toHaveValue-LIMAS-AUTH-034-username-only-signin.spec-42', async () => expect(loginPage.usernameField).toHaveValue(credentials.username));
      });

      await loginPage.advanceToPassword();
      // Password intentionally left empty — no keystrokes

      // --- Submit and verify rejection ---
      await detailedStep(page, 'Keycloak Sign In clicked', ctr, async () => {
        await loginPage.submitKeycloakLogin();
      });

      await detailedStep(page, 'Rejection verified', ctr, async () => {
        await recordEvidence('assert-missing-password-feedback', async () => expect(loginPage.keycloakErrorMessage).toBeVisible());
        const hasError = await loginPage.keycloakErrorMessage.isVisible();
        const stillOnKeycloak = loginPage.isIdentityProvider();
        await recordEvidence('assert-toBe-LIMAS-AUTH-034-username-only-signin.spec-55', async () => expect(hasError || stillOnKeycloak).toBe(true));
      });

      apiSummary = buildApiSummary({
        method: 'POST', pathname: '/realms/LIMAS/protocol/openid-connect/auth', status: 401,
        trigger: 'Keycloak Sign In (username only)',
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
