import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep } from '../helpers/evidence';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-026';

test.describe('LIMAS-AUTH-026: User button visibility after login', () => {
  test('should display user identity button in header after login', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const flow = new AuthenticationFlow(page);
      await evidenceStep(page, 'Authenticate via Keycloak login', '01', async () => {
        await flow.ensureAuthenticated(PROFILE);
      });
      await evidenceStep(page, 'Verify user identity button in header', '02', async () => {
        const dashboard = new SystemUserDashboardPage(page);
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-026-user-button-visible.spec-22', async () => expect(dashboard.userButton).toBeVisible());
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});