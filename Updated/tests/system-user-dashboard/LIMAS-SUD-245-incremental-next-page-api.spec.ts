import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-245: should return HTTP 200 for the next-page processed API call after scrolling', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const responsePromise = page.waitForResponse(
      resp => resp.url().includes('/limas/api/request/processed') && resp.url().includes('&size=') && resp.status() === 200
    );

    await dashboard.triggerSingleIncrementalLoad();

    const response = await responsePromise;
    await recordEvidence('assert-toBe-LIMAS-SUD-245-incremental-next-page-api.spec-18', async () => expect(response.status()).toBe(200));
  });
});