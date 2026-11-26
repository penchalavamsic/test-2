import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-042: Active state update on navigation', () => {
  test('should update aria-current when navigating between sidebar links', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Initial: System User Dashboard is active
    await dashboard.waitForSidebar();
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-042-active-state-update.spec-10', async () => expect(dashboard.navSystemUserDashboard).toHaveAttribute('aria-current', 'page'));

    // Navigate to User Licenses
    await recordEvidence('action-click-LIMAS-SUD-042-active-state-update.spec-13', async () => dashboard.navUserLicenses.click());
    await page.waitForURL('**/users-licenses');

    // Sidebar is persistent — User Licenses should now be active
    await dashboard.waitForSidebar();
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-042-active-state-update.spec-18', async () => expect(dashboard.navUserLicenses).toHaveAttribute('aria-current', 'page'));

    // Return to System User Dashboard
    await recordEvidence('action-click-LIMAS-SUD-042-active-state-update.spec-21', async () => dashboard.navSystemUserDashboard.click());
    await dashboard.assertRoute();

    // Sidebar is persistent — System User Dashboard should be active again
    await dashboard.waitForSidebar();
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-042-active-state-update.spec-26', async () => expect(dashboard.navSystemUserDashboard).toHaveAttribute('aria-current', 'page'));
  });
});