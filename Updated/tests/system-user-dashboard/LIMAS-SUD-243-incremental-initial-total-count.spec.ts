import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-243: should report a total processed count greater than zero after initial history load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const totalCount = await dashboard.getTotalProcessedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-243-incremental-initial-total-count.spec-12', async () => expect(totalCount).toBeGreaterThan(0));
  });
});