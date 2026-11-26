import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-205: should perform client-side filtering without triggering new API calls in history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-205-history-search-client-side.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    await page.waitForLoadState('networkidle');

    const firstPara = dashboard.getPendingRequestUserName(dashboard.processedRecordCards.first());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-205-history-search-client-side.spec-17', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    let apiRequestTriggered = false;
    const requestListener = (request: any) => {
      if (request.url().includes('/limas/api/request/processed')) {
        apiRequestTriggered = true;
      }
    };
    page.on('request', requestListener);

    await recordEvidence('action-fill-LIMAS-SUD-205-history-search-client-side.spec-29', async () => dashboard.licenseSearchInput.fill(searchSubstring));

    await page.waitForTimeout(1000);

    page.off('request', requestListener);

    // Client-side filtering should not trigger a new API request
    await recordEvidence('assert-toBe-LIMAS-SUD-205-history-search-client-side.spec-36', async () => expect(apiRequestTriggered).toBe(false));

    await recordEvidence('action-clear-LIMAS-SUD-205-history-search-client-side.spec-38', async () => dashboard.licenseSearchInput.clear());
  });
});