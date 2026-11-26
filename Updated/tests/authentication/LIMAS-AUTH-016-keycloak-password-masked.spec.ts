import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-016';
test.describe('LIMAS-AUTH-016: Password masked state', () => {
  test('should mask Password field and show Show password toggle', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      await evidenceStep(page, 'Open Keycloak login page', '01', async () => { await loginPage.goto(); await loginPage.clickSignIn(); await loginPage.openPasswordStep(); });
      await evidenceStep(page, 'Verify Password type is password and toggle visible', '02', async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-016-keycloak-password-masked.spec-16', async () => expect(loginPage.passwordField).toBeVisible());
        const inputType = await loginPage.passwordField.getAttribute('type');
        await recordEvidence('assert-toBe-LIMAS-AUTH-016-keycloak-password-masked.spec-18', async () => expect(inputType).toBe('password'));
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-016-keycloak-password-masked.spec-19', async () => expect(loginPage.showPasswordButton).toBeVisible());
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});