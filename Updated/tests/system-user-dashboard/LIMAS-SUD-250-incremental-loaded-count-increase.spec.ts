import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-250: should increase the loaded count displayed after incremental load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const initialLoaded = await dashboard.getLoadedCount();

    await dashboard.triggerSingleIncrementalLoad();

    const updatedLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-250-incremental-loaded-count-increase.spec-16', async () => expect(updatedLoaded).toBeGreaterThan(initialLoaded));
  });
});