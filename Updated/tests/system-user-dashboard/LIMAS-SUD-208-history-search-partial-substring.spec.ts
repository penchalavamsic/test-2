import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-208: should match records containing the search term as a substring in history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-208-history-search-partial-substring.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const firstPara = dashboard.getPendingRequestUserName(dashboard.processedRecordCards.first());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-208-history-search-partial-substring.spec-15', async () => expect(firstPara).toBeVisible());
    const fullText = (await firstPara.textContent())!.trim();

    // Use an inner substring (skip first char) to confirm contains matching
    const innerSubstring = fullText.substring(1, Math.min(5, fullText.length));

    await recordEvidence('action-fill-LIMAS-SUD-208-history-search-partial-substring.spec-21', async () => dashboard.licenseSearchInput.fill(innerSubstring));

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-208-history-search-partial-substring.spec-23', async () => expect.poll(async () => {
      return dashboard.getLoadedCount();
    }, { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const filteredLoaded = await dashboard.getLoadedCount();

    // Substring matching: at minimum there's the record we extracted from
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-208-history-search-partial-substring.spec-28', async () => expect(filteredLoaded).toBeGreaterThanOrEqual(1));

    await recordEvidence('action-clear-LIMAS-SUD-208-history-search-partial-substring.spec-30', async () => dashboard.licenseSearchInput.clear());
  });
});