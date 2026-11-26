import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-263: should preserve /system-user-dashboard route after history disabled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.disableHistory();
    await dashboard.waitForPendingView();

    await recordEvidence('assert-toContain-LIMAS-SUD-263-route-preservation-after-toggle.spec-15', async () => expect(page.url()).toContain('/system-user-dashboard'));
  });
});