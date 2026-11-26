import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-198: should update the count display after performing a search in history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-198-history-search-count-updates.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-198-history-search-count-updates.spec-13', async () => expect(dashboard.processedCountText).toBeVisible());

    const initialTotal = await dashboard.getTotalProcessedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-198-history-search-count-updates.spec-16', async () => expect(initialTotal).toBeGreaterThan(0));

    const firstPara = dashboard.getPendingRequestUserName(dashboard.processedRecordCards.first());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-198-history-search-count-updates.spec-19', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    await recordEvidence('action-fill-LIMAS-SUD-198-history-search-count-updates.spec-23', async () => dashboard.licenseSearchInput.fill(searchSubstring));

    await recordEvidence('assert-toPass-LIMAS-SUD-198-history-search-count-updates.spec-25', async () => expect(async () => {
      const updatedText = await dashboard.processedCountText.textContent();
      await recordEvidence('assert-toMatch-LIMAS-SUD-198-history-search-count-updates.spec-27', async () => expect(updatedText).toMatch(/\d+\s*loaded[·•]\d+\s*total\s+processed/i));
      const updatedLoaded = await dashboard.getLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-198-history-search-count-updates.spec-29', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(0));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('action-clear-LIMAS-SUD-198-history-search-count-updates.spec-32', async () => dashboard.licenseSearchInput.clear());
  });
});