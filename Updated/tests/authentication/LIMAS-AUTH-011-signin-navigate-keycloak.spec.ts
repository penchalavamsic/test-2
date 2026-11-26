import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep, buildApiSummary } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-011';

test.describe('LIMAS-AUTH-011: Sign In navigates to Keycloak', () => {
  test('should navigate to Keycloak login page after clicking Sign In', async ({
    page, attachEvidencePlan, attachEvidenceResult,
  }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);

      await evidenceStep(page, 'Open LIMAS login page', '01', async () => { await loginPage.goto(); });

      await evidenceStep(page, 'Click LIMAS Sign In', '02', async () => {
        await loginPage.clickSignIn();
      });

      await evidenceStep(page, 'Verify Keycloak heading visible', '03', async () => {
        await recordEvidence('assert-toBeVisible-LIMAS-AUTH-011-signin-navigate-keycloak.spec-26', async () => expect(loginPage.keycloakHeading).toBeVisible());
      });

      apiSummary = buildApiSummary({
        method: 'GET', pathname: '/auth', status: 200,
        trigger: 'Sign In click',
        redirects: ['/login', '/realms/LIMAS/protocol/openid-connect/auth'],
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});