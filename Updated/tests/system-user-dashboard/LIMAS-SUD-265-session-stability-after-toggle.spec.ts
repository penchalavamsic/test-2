import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-265: should keep user session active after disabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.disableHistory();
    await dashboard.waitForPendingView();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-265-session-stability-after-toggle.spec-15', async () => expect(dashboard.userButton).toBeVisible());
  });
});