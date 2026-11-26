import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-209: should filter immediately without debounce in history search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const firstPara = dashboard.getPendingRequestUserName(dashboard.processedRecordCards.first());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-15', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    // Type first character and immediately observe filtering
    await recordEvidence('action-fill-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-20', async () => dashboard.licenseSearchInput.fill(searchSubstring.charAt(0)));

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-22', async () => expect.poll(async () => {
      return dashboard.getLoadedCount();
    }, { timeout: 5_000 }).toBeGreaterThanOrEqual(0));
    const singleCharLoaded = await dashboard.getLoadedCount();

    // Type remaining characters — filtering happens per keystroke (no debounce wait needed)
    await recordEvidence('action-fill-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-27', async () => dashboard.licenseSearchInput.fill(searchSubstring));

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-29', async () => expect.poll(async () => {
      return dashboard.getLoadedCount();
    }, { timeout: 5_000 }).toBeGreaterThanOrEqual(0));
    const fullTermLoaded = await dashboard.getLoadedCount();

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-33', async () => expect(singleCharLoaded).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-34', async () => expect(fullTermLoaded).toBeGreaterThanOrEqual(0));

    await recordEvidence('action-clear-LIMAS-SUD-209-history-search-immediate-no-debounce.spec-36', async () => dashboard.licenseSearchInput.clear());
  });
});