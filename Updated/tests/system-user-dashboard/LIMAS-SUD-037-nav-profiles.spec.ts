import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-037: Navigation — Profile', () => {
  test('should navigate to /profiles and return to dashboard', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-037-nav-profiles.spec-9', async () => dashboard.navProfiles.click());
    await page.waitForURL('**/profiles');

    // Return to dashboard
    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-037-nav-profiles.spec-14', async () => dashboard.navSystemUserDashboard.click());
    await dashboard.assertRoute();
  });
});