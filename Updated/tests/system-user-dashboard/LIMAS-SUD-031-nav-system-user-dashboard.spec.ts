import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-031: Navigation — System User Dashboard link', () => {
  test('should click System User Dashboard link and stay on same route', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Sidebar is always visible — nav links are clickable directly.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-031-nav-system-user-dashboard.spec-9', async () => expect(dashboard.sidebarContainer).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-031-nav-system-user-dashboard.spec-10', async () => expect(dashboard.navSystemUserDashboard).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-031-nav-system-user-dashboard.spec-11', async () => dashboard.navSystemUserDashboard.click());

    await dashboard.assertRoute();
  });
});
