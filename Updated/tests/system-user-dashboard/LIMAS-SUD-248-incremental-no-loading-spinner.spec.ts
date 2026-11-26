import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-248: should have no loading spinner visible after incremental load triggers', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.triggerSingleIncrementalLoad();

    const progressCount = await page.locator('[role="progressbar"]').count();
    await recordEvidence('assert-toBe-LIMAS-SUD-248-incremental-no-loading-spinner.spec-14', async () => expect(progressCount).toBe(0));
  });
});