import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-024';

test.describe('LIMAS-AUTH-024: Footer copyright visibility', () => {
  test('should display KPIT copyright notice on login page', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      await evidenceStep(page, 'Open LIMAS login page', '01', async () => { await loginPage.goto(); });
      await evidenceStep(page, 'Verify copyright notice', '02', async () => { await recordEvidence('assert-toBeVisible-LIMAS-AUTH-024-footer-visibility.spec-16', async () => expect(loginPage.copyrightNotice).toBeVisible()); });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});