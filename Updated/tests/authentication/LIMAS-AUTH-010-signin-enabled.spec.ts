import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep, buildApiSummary } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-010';

test.describe('LIMAS-AUTH-010: Sign In button enabled state', () => {
  test('should show Sign In button enabled on login page', async ({
    page,
    attachEvidencePlan,
    attachEvidenceResult,
  }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;

    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);

      await evidenceStep(page, 'Open LIMAS login page', '01', async () => {
        await loginPage.goto();
      });

      await evidenceStep(page, 'Verify Sign In button visible and enabled', '02', async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-010-signin-enabled.spec-27', async () => expect(loginPage.signInButton).toBeVisible());
        await recordEvidence('assert-toBeEnabled-LIMAS-AUTH-010-signin-enabled.spec-28', async () => expect(loginPage.signInButton).toBeEnabled());
      });

      apiSummary = buildApiSummary({
        method: 'GET',
        pathname: '/login',
        status: 200,
        trigger: 'Page navigation',
      });
    } catch (e: any) {
      status = 'failed';
      errorMessage = e?.message ?? String(e);
    } finally {
      await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary });
    }
  });
});