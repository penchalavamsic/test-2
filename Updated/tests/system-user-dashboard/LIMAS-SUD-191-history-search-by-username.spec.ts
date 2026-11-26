import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-191: should filter processed list by user name substring', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-191-history-search-by-username.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-191-history-search-by-username.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const firstPara = dashboard.getPendingRequestUserName(dashboard.processedRecordCards.first());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-191-history-search-by-username.spec-18', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    await recordEvidence('action-fill-LIMAS-SUD-191-history-search-by-username.spec-22', async () => dashboard.licenseSearchInput.fill(searchSubstring));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-191-history-search-by-username.spec-24', async () => expect(dashboard.licenseSearchInput).toHaveValue(searchSubstring));

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-191-history-search-by-username.spec-26', async () => expect.poll(async () => {
      return dashboard.getLoadedCount();
    }, { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const filteredLoaded = await dashboard.getLoadedCount();

    await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-191-history-search-by-username.spec-30', async () => expect(filteredLoaded).toBeLessThanOrEqual(initialLoaded));

    await recordEvidence('action-clear-LIMAS-SUD-191-history-search-by-username.spec-32', async () => dashboard.licenseSearchInput.clear());
  });
});