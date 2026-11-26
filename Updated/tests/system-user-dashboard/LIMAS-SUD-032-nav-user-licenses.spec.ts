import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-032: Navigation — User Licenses', () => {
  test('should navigate to /users-licenses and return to dashboard', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Sidebar is always visible — nav links are clickable directly.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-032-nav-user-licenses.spec-9', async () => expect(dashboard.sidebarContainer).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-032-nav-user-licenses.spec-10', async () => expect(dashboard.navUserLicenses).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-032-nav-user-licenses.spec-11', async () => dashboard.navUserLicenses.click());
    await page.waitForURL('**/users-licenses');

    // Return to dashboard — sidebar is still visible on the new page.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-032-nav-user-licenses.spec-15', async () => expect(dashboard.sidebarContainer).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-032-nav-user-licenses.spec-16', async () => dashboard.navSystemUserDashboard.click());
    await dashboard.assertRoute();
  });
});
