import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-258: should show pending subtitle after disabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Enable then disable to trigger pending view restoration
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.disableHistory();
    await dashboard.waitForPendingView();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-258-pending-subtitle-restoration.spec-15', async () => expect(dashboard.pendingSectionSubtitle).toBeVisible());
  });
});