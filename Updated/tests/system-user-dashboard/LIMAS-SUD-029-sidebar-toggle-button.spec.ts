import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-029: Sidebar toggle button', () => {
  test('should show the toggle button inside the sidebar container as visible and enabled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Sidebar is always visible — no keyboard shortcut needed.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-029-sidebar-toggle-button.spec-9', async () => expect(dashboard.sidebarContainer).toBeVisible());

    // The toggle button is the sole <button data-sidebar="menu-button"> in the
    // sidebar menu (every other menu item is an <a> navigation link).
    // Confirmed via execution trace DOM: when the sidebar renders collapsed
    // (data-collapsible="icon") the button shows an icon only — no visible
    // text, aria-label, or title — so accessible-name locators are unreliable.
    // Accessibility finding: toggle button has no accessible name when collapsed.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-029-sidebar-toggle-button.spec-17', async () => expect(dashboard.sidebarToggleButton).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-029-sidebar-toggle-button.spec-18', async () => expect(dashboard.sidebarToggleButton).toBeEnabled());
  });
});
