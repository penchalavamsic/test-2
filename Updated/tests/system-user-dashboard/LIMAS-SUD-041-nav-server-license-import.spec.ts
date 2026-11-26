import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-041: Navigation — Server License Import', () => {
  test('should navigate to /server-license-import and return to dashboard', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-041-nav-server-license-import.spec-9', async () => dashboard.navServerLicenseImport.click());
    await page.waitForURL('**/server-license-import');

    // Return to dashboard
    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-041-nav-server-license-import.spec-14', async () => dashboard.navSystemUserDashboard.click());
    await dashboard.assertRoute();
  });
});