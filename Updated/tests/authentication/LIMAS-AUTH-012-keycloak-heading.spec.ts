import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { evidenceStep, buildApiSummary } from '../helpers/evidence';
import { LoginPage } from '../pages/login.page';

const TEST_ID = 'LIMAS-AUTH-012';

test.describe('LIMAS-AUTH-012: Keycloak heading visibility', () => {
  test('should display Keycloak Sign In heading', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      await evidenceStep(page, 'Open LIMAS and click Sign In', '01', async () => { await loginPage.goto(); await loginPage.clickSignIn(); });
      await evidenceStep(page, 'Verify Keycloak heading', '02', async () => { await recordEvidence('assert-toBeVisible-LIMAS-AUTH-012-keycloak-heading.spec-16', async () => expect(loginPage.keycloakHeading).toBeVisible()); });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage }); }
  });
});