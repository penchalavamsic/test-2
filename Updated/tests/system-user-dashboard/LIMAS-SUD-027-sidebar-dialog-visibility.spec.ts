import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-027: Sidebar visibility on load', () => {
  test('should show the sidebar container, nav list, and 11 navigation items on page load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Sidebar is always visible on the System User Dashboard — it is not a dialog.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-027-sidebar-dialog-visibility.spec-9', async () => expect(dashboard.sidebarContainer).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-027-sidebar-dialog-visibility.spec-10', async () => expect(dashboard.sidebarList).toBeVisible());

    // Confirmed via execution trace DOM: the sidebar menu <ul> contains 12
    // <li data-sidebar="menu-item"> children — 1 toggle <button> plus 11
    // navigation <a> links. sidebarNavItems is scoped to the anchors only,
    // so it reports the 11 navigation links, excluding the toggle control.
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-027-sidebar-dialog-visibility.spec-16', async () => expect(dashboard.sidebarNavItems).toHaveCount(11));

    // Accessibility gap: the sidebar root DIV has no ARIA landmark role
    // (no "navigation", "complementary", or "dialog"). Reported as finding.
  });
});
