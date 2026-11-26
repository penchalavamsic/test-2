import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-022';

test.describe('LIMAS-AUTH-022: Page refresh session persistence', () => {
  test('should retain dashboard after page refresh', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const flow = new AuthenticationFlow(page);

      await evidenceStep(page, 'Authenticate and verify dashboard', '01', async () => {
        await flow.ensureAuthenticated(PROFILE);
        const dashboard = new SystemUserDashboardPage(page);
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-022-refresh-persistence.spec-21', async () => expect(dashboard.heading).toBeVisible());
      });

      await evidenceStep(page, 'Refresh page and verify session persists', '02', async () => {
        await recordEvidence('action-reload-LIMAS-AUTH-022-refresh-persistence.spec-25', async () => page.reload());
        const dashboard = new SystemUserDashboardPage(page);
        await dashboard.waitForLoad();
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-022-refresh-persistence.spec-28', async () => expect(dashboard.heading).toBeVisible());
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});