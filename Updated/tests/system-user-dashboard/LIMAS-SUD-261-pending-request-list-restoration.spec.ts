import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-261: should show pending request action buttons after disabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.disableHistory();
    await dashboard.waitForPendingView();

    // Pending records should have action buttons — at least approve or delete
    const approveCount = await dashboard.approveButtons.count();
    const deleteCount = await dashboard.deleteButtons.count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-261-pending-request-list-restoration.spec-18', async () => expect(approveCount + deleteCount).toBeGreaterThan(0));
  });
});