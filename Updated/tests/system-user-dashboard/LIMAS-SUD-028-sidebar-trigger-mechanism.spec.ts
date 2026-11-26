import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-028: Sidebar trigger mechanism — accessibility case', () => {
  test('should document that no accessible trigger button with sidebar/menu name exists, and sidebar is always visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Accessibility finding: no button with sidebar/menu/toggle accessible name
    // exists OUTSIDE the sidebar container. The toggle button exists inside the
    // sidebar itself — not as a separate trigger in the header.
    const header = page.locator('header, [role="banner"]');
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-028-sidebar-trigger-mechanism.spec-12', async () => expect(header.getByRole('button', { name: /sidebar/i })).toHaveCount(0));
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-028-sidebar-trigger-mechanism.spec-13', async () => expect(header.getByRole('button', { name: /menu/i })).toHaveCount(0));
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-028-sidebar-trigger-mechanism.spec-14', async () => expect(header.getByRole('button', { name: /toggle/i })).toHaveCount(0));

    // Ctrl+B does nothing — the sidebar is already visible on page load.
    // Verified via live inspection at 1920px and 768px viewports.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-028-sidebar-trigger-mechanism.spec-18', async () => expect(dashboard.sidebarContainer).toBeVisible());

    // The toggle button inside the sidebar collapses it to icon-only.
    // Confirmed via execution trace DOM: when the sidebar renders collapsed
    // (data-collapsible="icon") the button shows an icon only — no visible
    // text, aria-label, or title — so it is located by its stable
    // data-sidebar="menu-button" markup rather than an accessible name.
    // Accessibility finding: toggle button has no accessible name when collapsed.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-028-sidebar-trigger-mechanism.spec-26', async () => expect(dashboard.sidebarToggleButton).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-028-sidebar-trigger-mechanism.spec-27', async () => expect(dashboard.sidebarToggleButton).toBeEnabled());
  });
});
