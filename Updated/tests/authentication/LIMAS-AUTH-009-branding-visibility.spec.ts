import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep, buildApiSummary } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-009';

test.describe('LIMAS-AUTH-009: Branding visibility', () => {
  test('should display KPIT and LIMAS logos on login page', async ({
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

      await evidenceStep(page, 'Navigate to LIMAS login page', '01', async () => {
        await recordEvidence('action-goto-LIMAS-AUTH-009-branding-visibility.spec-23', async () => page.goto('/'));
      });

      await evidenceStep(page, 'Verify KPIT and LIMAS branding logos', '02', async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-009-branding-visibility.spec-27', async () => expect(loginPage.kpitLogo).toBeVisible());
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-009-branding-visibility.spec-28', async () => expect(loginPage.limasLogo).toBeVisible());
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
      await attachEvidenceResult({
        status,
        duration: Date.now() - start,
        errorMessage,
        apiSummary,
      });
    }
  });
});