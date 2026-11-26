import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-045: Route preservation with persistent sidebar', () => {
  test('should preserve dashboard route and heading while the sidebar remains visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);

    // Confirmed via live inspection: the sidebar is persistent and Escape does
    // not close it. There is no close workflow — route preservation is
    // validated with the sidebar remaining visible throughout.
    await dashboard.waitForSidebar();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-045-route-preservation.spec-12', async () => expect(dashboard.sidebarContainer).toBeVisible());

    await recordEvidence('action-press-LIMAS-SUD-045-route-preservation.spec-14', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-045-route-preservation.spec-15', async () => expect(dashboard.sidebarContainer).toBeVisible());

    await dashboard.assertRoute();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-045-route-preservation.spec-18', async () => expect(dashboard.heading).toBeVisible());
  });
});
