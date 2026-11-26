import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-013';

test.describe('LIMAS-AUTH-013: Username field visibility', () => {
  test('should display Username or email field on Keycloak', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      await evidenceStep(page, 'Open Keycloak login page', '01', async () => { await loginPage.goto(); await loginPage.clickSignIn(); });
      await evidenceStep(page, 'Verify Username field visible', '02', async () => { await recordEvidence('assert-toBeVisible-LIMAS-AUTH-013-keycloak-username-visible.spec-16', async () => expect(loginPage.usernameField).toBeVisible()); });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});