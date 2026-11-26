import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-034: Navigation — Floating License Configurations', () => {
  test('should navigate to /floating-license-configurations and return to dashboard', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-034-nav-floating-license-configs.spec-9', async () => dashboard.navFloatingLicenseConfigs.click());
    await page.waitForURL('**/floating-license-configurations');

    // Return to dashboard
    await dashboard.waitForSidebar();
    await recordEvidence('action-click-LIMAS-SUD-034-nav-floating-license-configs.spec-14', async () => dashboard.navSystemUserDashboard.click());
    await dashboard.assertRoute();
  });
});