import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-242: should report a loaded count greater than zero after initial history load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const loadedCount = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-242-incremental-initial-loaded-count.spec-12', async () => expect(loadedCount).toBeGreaterThan(0));
  });
});