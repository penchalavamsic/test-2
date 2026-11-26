import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-158: Browser back button behavior', () => {
  test('should navigate back and forward correctly', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-158-browser-back-button.spec-8', async () => expect(dashboard.heading).toBeVisible());

    const dashboardUrl = page.url();

    // Go back — should leave the dashboard
    await recordEvidence('action-goBack-LIMAS-SUD-158-browser-back-button.spec-13', async () => page.goBack());
    await page.waitForLoadState('networkidle');
    const backUrl = page.url();
    await recordEvidence('assert-toBe-LIMAS-SUD-158-browser-back-button.spec-16', async () => expect(backUrl).not.toBe(dashboardUrl));

    // Go forward — should return to the dashboard
    await recordEvidence('action-goForward-LIMAS-SUD-158-browser-back-button.spec-19', async () => page.goForward());
    await page.waitForURL('**/system-user-dashboard');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-158-browser-back-button.spec-21', async () => expect(dashboard.heading).toBeVisible());
    await recordEvidence('assert-toContain-LIMAS-SUD-158-browser-back-button.spec-22', async () => expect(page.url()).toContain('/system-user-dashboard'));
  });
});