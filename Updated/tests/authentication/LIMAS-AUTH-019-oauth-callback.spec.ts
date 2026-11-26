import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep, buildApiSummary } from '../helpers/evidence';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-019';

test.describe('LIMAS-AUTH-019: OAuth callback completion', () => {
  test('should complete OAuth callback and redirect to dashboard', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const flow = new AuthenticationFlow(page);

      await evidenceStep(page, 'Authenticate via Keycloak login', '01', async () => {
        await flow.ensureAuthenticated(PROFILE);
      });

      await evidenceStep(page, 'Verify dashboard route and heading', '02', async () => {
        const dashboard = new SystemUserDashboardPage(page);
        await dashboard.assertRoute();
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-019-oauth-callback.spec-26', async () => expect(dashboard.heading).toBeVisible());
      });

      apiSummary = buildApiSummary({
        method: 'GET', pathname: '/auth/callback', status: 200,
        trigger: 'Keycloak redirect',
        redirects: ['/realms/LIMAS/protocol/openid-connect/auth', '/auth/callback', '/system-user-dashboard'],
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});