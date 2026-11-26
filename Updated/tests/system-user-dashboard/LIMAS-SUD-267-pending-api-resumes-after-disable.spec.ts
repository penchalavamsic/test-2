import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-267: should resume pending API call after disabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Set up pending API interception before disabling history
    const pendingResp = page.waitForResponse(
      resp => resp.url().includes('/limas/api/request/pending') && resp.status() === 200
    );

    await dashboard.disableHistory();
    await dashboard.waitForPendingView();

    const response = await pendingResp;
    await recordEvidence('assert-toBe-LIMAS-SUD-267-pending-api-resumes-after-disable.spec-21', async () => expect(response.status()).toBe(200));
  });
});