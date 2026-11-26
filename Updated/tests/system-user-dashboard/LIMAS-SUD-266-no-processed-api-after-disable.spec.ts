import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-266: should not fire a processed API request after disabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Intercept processed API — expect none to fire after disable
    let processedFired = false;
    page.on('request', (req) => {
      if (req.url().includes('/limas/api/request/processed')) {
        processedFired = true;
      }
    });

    await dashboard.disableHistory();
    await dashboard.waitForPendingView();

    // Allow a short window for any late processed API call; none should fire
    await page.waitForTimeout(2000);
    await recordEvidence('assert-toBe-LIMAS-SUD-266-no-processed-api-after-disable.spec-25', async () => expect(processedFired).toBe(false));
  });
});