import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-039: Navigation — System Users', () => {
  test('should navigate to /system-users and return to dashboard', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-039-nav-system-users.spec-9', async () => dashboard.navSystemUsers.click());
    await page.waitForURL('**/system-users');

    // Return to dashboard
    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-039-nav-system-users.spec-14', async () => dashboard.navSystemUserDashboard.click());
    await dashboard.assertRoute();
  });
});