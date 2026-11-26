import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-033: Navigation — Reports', () => {
  test('should navigate to /reports and return to dashboard', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Sidebar is always visible — nav links are clickable directly.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-033-nav-reports.spec-9', async () => expect(dashboard.sidebarContainer).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-033-nav-reports.spec-10', async () => expect(dashboard.navReports).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-033-nav-reports.spec-11', async () => dashboard.navReports.click());
    await page.waitForURL('**/reports');

    // Return to dashboard — sidebar is still visible on the new page.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-033-nav-reports.spec-15', async () => expect(dashboard.sidebarContainer).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-033-nav-reports.spec-16', async () => dashboard.navSystemUserDashboard.click());
    await dashboard.assertRoute();
  });
});
