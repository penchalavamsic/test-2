import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-244: should increase loaded count after scroll-triggered incremental load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const initialLoaded = await dashboard.getLoadedCount();

    await dashboard.scrollToLoadMoreNote();
    await dashboard.waitForNextProcessedPage();

    const updatedLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-244-incremental-scroll-trigger.spec-17', async () => expect(updatedLoaded).toBeGreaterThan(initialLoaded));
  });
});