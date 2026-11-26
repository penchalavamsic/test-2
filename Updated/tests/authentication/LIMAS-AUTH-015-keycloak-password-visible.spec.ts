import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-015';
test.describe('LIMAS-AUTH-015: Password field visibility', () => {
  test('should display Password field on Keycloak', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      await evidenceStep(page, 'Open Keycloak login page', '01', async () => { await loginPage.goto(); await loginPage.clickSignIn(); await loginPage.openPasswordStep(); });
      await evidenceStep(page, 'Verify Password field visible', '02', async () => { await recordEvidence('assert-toBeVisible-LIMAS-AUTH-015-keycloak-password-visible.spec-15', async () => expect(loginPage.passwordField).toBeVisible()); });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});