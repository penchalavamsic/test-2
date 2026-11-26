import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-025';

test.describe('LIMAS-AUTH-025: Show password toggle visibility', () => {
  test('should display Show password button on Keycloak login', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      await evidenceStep(page, 'Open Keycloak login page', '01', async () => { await loginPage.goto(); await loginPage.clickSignIn(); await loginPage.openPasswordStep(); });
      await evidenceStep(page, 'Verify Show password button visible', '02', async () => { await recordEvidence('assert-toBeVisible-LIMAS-AUTH-025-show-password-toggle.spec-16', async () => expect(loginPage.showPasswordButton).toBeVisible()); });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});