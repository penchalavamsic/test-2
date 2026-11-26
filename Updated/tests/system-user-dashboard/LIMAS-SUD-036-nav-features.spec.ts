import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-036: Navigation — Features & Updates', () => {
  test('should navigate to /features and return to dashboard', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-036-nav-features.spec-9', async () => dashboard.navFeatures.click());
    await page.waitForURL('**/features');

    // Return to dashboard
    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-036-nav-features.spec-14', async () => dashboard.navSystemUserDashboard.click());
    await dashboard.assertRoute();
  });
});