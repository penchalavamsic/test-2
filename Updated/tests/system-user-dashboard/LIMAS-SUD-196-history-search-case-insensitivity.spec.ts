import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-196: should perform case-insensitive search in history mode', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-196-history-search-case-insensitivity.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const firstPara = dashboard.getPendingRequestUserName(dashboard.processedRecordCards.first());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-196-history-search-case-insensitivity.spec-15', async () => expect(firstPara).toBeVisible());
    const text = (await firstPara.textContent())?.trim() ?? '';
    const alphaMatch = text.match(/[A-Za-z]{2,}/);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-196-history-search-case-insensitivity.spec-18', async () => expect(alphaMatch).toBeTruthy());
    const searchTerm = alphaMatch![0];

    await recordEvidence('action-fill-LIMAS-SUD-196-history-search-case-insensitivity.spec-21', async () => dashboard.licenseSearchInput.fill(searchTerm));
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-196-history-search-case-insensitivity.spec-22', async () => expect.poll(() => dashboard.getLoadedCount(), { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const originalLoaded = await dashboard.getLoadedCount();

    await recordEvidence('action-clear-LIMAS-SUD-196-history-search-case-insensitivity.spec-25', async () => dashboard.licenseSearchInput.clear());

    const invertedTerm = searchTerm === searchTerm.toUpperCase()
      ? searchTerm.toLowerCase()
      : searchTerm.toUpperCase();

    await recordEvidence('action-fill-LIMAS-SUD-196-history-search-case-insensitivity.spec-31', async () => dashboard.licenseSearchInput.fill(invertedTerm));
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-196-history-search-case-insensitivity.spec-32', async () => expect.poll(() => dashboard.getLoadedCount(), { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const invertedLoaded = await dashboard.getLoadedCount();


    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-196-history-search-case-insensitivity.spec-36', async () => expect(originalLoaded).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBe-LIMAS-SUD-196-history-search-case-insensitivity.spec-37', async () => expect(invertedLoaded).toBe(originalLoaded));

    await recordEvidence('action-clear-LIMAS-SUD-196-history-search-case-insensitivity.spec-39', async () => dashboard.licenseSearchInput.clear());
  });
});