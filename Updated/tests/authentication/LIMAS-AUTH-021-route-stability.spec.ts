import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-021';

test.describe('LIMAS-AUTH-021: Authenticated route stability', () => {
  test('should remain at /system-user-dashboard without redirect loops', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const flow = new AuthenticationFlow(page);

      await evidenceStep(page, 'Authenticate and verify landing page', '01', async () => {
        await flow.ensureAuthenticated(PROFILE);
        const dashboard = new SystemUserDashboardPage(page);
        await dashboard.waitForLoad();
      });

      await evidenceStep(page, 'Verify route stability over time', '02', async () => {
        const url1 = page.url();
        await page.waitForTimeout(2000);
        const url2 = page.url();
        await recordEvidence('assert-toContain-LIMAS-AUTH-021-route-stability.spec-28', async () => expect(url2).toContain('/system-user-dashboard'));
        await recordEvidence('assert-toBe-LIMAS-AUTH-021-route-stability.spec-29', async () => expect(url2).toBe(url1));
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});