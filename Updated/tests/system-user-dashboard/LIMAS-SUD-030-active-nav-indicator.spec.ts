import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-030: Active navigation indicator', () => {
  test('should mark the current page link with aria-current="page"', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Sidebar is always visible — no keyboard shortcut needed.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-030-active-nav-indicator.spec-9', async () => expect(dashboard.sidebarContainer).toBeVisible());

    // The System User Dashboard link has aria-current="page" on load.
    // Confirmed via execution trace DOM: the anchor is identified by its
    // route href (/system-user-dashboard) scoped to the sidebar, since its
    // accessible name is unreliable when the sidebar renders collapsed
    // (icon-only, no visible text/aria-label). aria-current is checked on
    // this same anchor, where the execution DOM confirms it is set.
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-030-active-nav-indicator.spec-17', async () => expect(dashboard.navSystemUserDashboard).toHaveAttribute('aria-current', 'page'));
  });
});
