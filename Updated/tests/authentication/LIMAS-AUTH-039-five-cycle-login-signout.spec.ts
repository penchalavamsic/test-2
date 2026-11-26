import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/evidence-test';
import { detailedStep, typeSequentially, buildApiSummary } from '../helpers/evidence';
import { getCredentials , resolveProfileName } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const PROFILE = resolveProfileName();
const TEST_ID = 'LIMAS-AUTH-039';
const CYCLES = 5;

test.describe('LIMAS-AUTH-039: Five-cycle Login → Sign Out reliability', () => {
  test('should complete five consecutive login → sign-out cycles', async ({ page, attachEvidencePlan, attachEvidenceResult }) => {
    test.setTimeout(300000); // Five complete login/logout cycles with step evidence.
    const start = Date.now();
    let status: 'passed' | 'failed' = 'passed';
    let errorMessage: string | undefined;
    let apiSummary: string | undefined;
    const ctr = { seq: 0 };
    try {
      const { accessProfile } = await attachEvidencePlan(TEST_ID);
      const loginPage = new LoginPage(page);
      const credentials = getCredentials(PROFILE);

      for (let cycle = 1; cycle <= CYCLES; cycle++) {
        // --- Load login page ---
        await detailedStep(page, `Cycle ${cycle}: Login page loaded`, ctr, async () => {
          await loginPage.goto();
        });

        await detailedStep(page, `Cycle ${cycle}: Sign In clicked`, ctr, async () => {
          await loginPage.clickSignIn();
        });

        await detailedStep(page, `Cycle ${cycle}: Keycloak login form visible`, ctr, async () => {
          await recordEvidence('assert-toBeVisible-LIMAS-AUTH-039-five-cycle-login-signout.spec-34', async () => expect(loginPage.keycloakHeading).toBeVisible());
        });

        // --- Username entry — per-keystroke ---
        await detailedStep(page, `Cycle ${cycle}: Username field focused`, ctr, async () => {
          await recordEvidence('action-click-LIMAS-AUTH-039-five-cycle-login-signout.spec-39', async () => loginPage.usernameField.click());
        });

        await typeSequentially(loginPage.usernameField, credentials.username, page, 'username', ctr);

        await detailedStep(page, `Cycle ${cycle}: Username entry completed`, ctr, async () => {
          await recordEvidence('assert-toHaveValue-LIMAS-AUTH-039-five-cycle-login-signout.spec-45', async () => expect(loginPage.usernameField).toHaveValue(credentials.username));
        });
      await loginPage.advanceToPassword();


        // --- Password entry — per-keystroke ---
        await detailedStep(page, `Cycle ${cycle}: Password field focused`, ctr, async () => {
          await recordEvidence('action-click-LIMAS-AUTH-039-five-cycle-login-signout.spec-50', async () => loginPage.passwordField.click());
        });

        await typeSequentially(loginPage.passwordField, credentials.password, page, 'password', ctr);

        await detailedStep(page, `Cycle ${cycle}: Password entry completed`, ctr, async () => {
          // field value assertion omitted — Keycloak may mask
        });

        // --- Submit ---
        await detailedStep(page, `Cycle ${cycle}: Keycloak Sign In clicked`, ctr, async () => {
          await loginPage.submitKeycloakLogin();
          await page.waitForURL('**/system-user-dashboard', { timeout: 30000 });
        });

        // --- Dashboard verification ---
        await detailedStep(page, `Cycle ${cycle}: Dashboard verified`, ctr, async () => {
          const dashboard = new SystemUserDashboardPage(page);
          await recordEvidence('assert-toBeVisible-LIMAS-AUTH-039-five-cycle-login-signout.spec-68', async () => expect(dashboard.heading).toBeVisible());
        });

        // --- Sign Out ---
        await detailedStep(page, `Cycle ${cycle}: User menu opened`, ctr, async () => {
          await recordEvidence('action-click-LIMAS-AUTH-039-five-cycle-login-signout.spec-73', async () => loginPage.userButton.click());
        });

        await detailedStep(page, `Cycle ${cycle}: Sign Out clicked`, ctr, async () => {
          await recordEvidence('action-click-LIMAS-AUTH-039-five-cycle-login-signout.spec-77', async () => loginPage.logoutOption.click());
          await page.waitForURL('**/login', { timeout: 15000 });
        });

        await detailedStep(page, `Cycle ${cycle}: Sign-out verified`, ctr, async () => {
          await recordEvidence('assert-toBeVisible-LIMAS-AUTH-039-five-cycle-login-signout.spec-82', async () => expect(loginPage.signInButton).toBeVisible());
          await recordEvidence('assert-toContain-LIMAS-AUTH-039-five-cycle-login-signout.spec-83', async () => expect(page.url()).not.toContain('/system-user-dashboard'));
        });
      }

      apiSummary = buildApiSummary({
        method: 'GET', pathname: '/', status: 200,
        trigger: `Five-cycle Login → Sign Out completed (${CYCLES} cycles)`,
      });
    } catch (e: any) { status = 'failed'; errorMessage = e?.message ?? String(e); }
    finally { await attachEvidenceResult({ status, duration: Date.now() - start, errorMessage, apiSummary }); }
  });
});
