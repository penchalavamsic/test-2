import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-199: should restore original loaded count after clearing history search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-199-history-search-clear-restores-list.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-199-history-search-clear-restores-list.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const firstPara = dashboard.getPendingRequestUserName(dashboard.processedRecordCards.first());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-199-history-search-clear-restores-list.spec-18', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    await recordEvidence('action-fill-LIMAS-SUD-199-history-search-clear-restores-list.spec-22', async () => dashboard.licenseSearchInput.fill(searchSubstring));

    await recordEvidence('assert-toPass-LIMAS-SUD-199-history-search-clear-restores-list.spec-24', async () => expect(async () => {
      const searchedText = await dashboard.processedCountText.textContent();
      await recordEvidence('assert-toMatch-LIMAS-SUD-199-history-search-clear-restores-list.spec-26', async () => expect(searchedText).toMatch(/\d+\s*loaded[·•]\d+\s*total\s+processed/i));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('action-clear-LIMAS-SUD-199-history-search-clear-restores-list.spec-29', async () => dashboard.licenseSearchInput.clear());

    await recordEvidence('assert-toPass-LIMAS-SUD-199-history-search-clear-restores-list.spec-31', async () => expect(async () => {
      const restoredLoaded = await dashboard.getLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-199-history-search-clear-restores-list.spec-33', async () => expect(restoredLoaded).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-199-history-search-clear-restores-list.spec-36', async () => expect(dashboard.licenseSearchInput).toHaveValue(''));
  });
});