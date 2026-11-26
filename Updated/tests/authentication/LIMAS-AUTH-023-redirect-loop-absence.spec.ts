import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-023';

test.describe('LIMAS-AUTH-023: Redirect loop absence', () => {
  test('should not bounce back to login after authentication', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const flow = new AuthenticationFlow(page);
      await evidenceStep(page, 'Authenticate and verify landing', '01', async () => {
        await flow.ensureAuthenticated(PROFILE);
        const dashboard = new SystemUserDashboardPage(page);
        await dashboard.waitForLoad();
      });
      await evidenceStep(page, 'Verify no redirect to login after wait', '02', async () => {
        await page.waitForTimeout(3000);
        const url = page.url();
        await recordEvidence('assert-toContain-LIMAS-AUTH-023-redirect-loop-absence.spec-25', async () => expect(url).toContain('/system-user-dashboard'));
        await recordEvidence('assert-toContain-LIMAS-AUTH-023-redirect-loop-absence.spec-26', async () => expect(url).not.toContain('/login'));
        await recordEvidence('assert-toContain-LIMAS-AUTH-023-redirect-loop-absence.spec-27', async () => expect(url).not.toContain('realms/LIMAS/protocol/openid-connect'));
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});