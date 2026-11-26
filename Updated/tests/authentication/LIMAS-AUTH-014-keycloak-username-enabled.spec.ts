import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-014';

test.describe('LIMAS-AUTH-014: Username field enabled', () => {
  test('should have Username or email field enabled', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      await evidenceStep(page, 'Open Keycloak login page', '01', async () => { await loginPage.goto(); await loginPage.clickSignIn(); });
      await evidenceStep(page, 'Verify Username field visible and enabled', '02', async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-014-keycloak-username-enabled.spec-17', async () => expect(loginPage.usernameField).toBeVisible());
        await recordEvidence('assert-toBeEnabled-LIMAS-AUTH-014-keycloak-username-enabled.spec-18', async () => expect(loginPage.usernameField).toBeEnabled());
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});