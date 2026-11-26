import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-251: should keep total processed count consistent after incremental load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const initialTotal = await dashboard.getTotalProcessedCount();

    await dashboard.triggerSingleIncrementalLoad();

    const updatedTotal = await dashboard.getTotalProcessedCount();
    await recordEvidence('assert-toBe-LIMAS-SUD-251-incremental-total-count-consistent.spec-16', async () => expect(updatedTotal).toBe(initialTotal));
  });
});