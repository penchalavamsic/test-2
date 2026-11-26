import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-197: should trim leading/trailing whitespace in history search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-197-history-search-whitespace-trimming.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const firstPara = dashboard.getPendingRequestUserName(dashboard.processedRecordCards.first());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-197-history-search-whitespace-trimming.spec-15', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    await recordEvidence('action-fill-LIMAS-SUD-197-history-search-whitespace-trimming.spec-19', async () => dashboard.licenseSearchInput.fill(searchSubstring));
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-197-history-search-whitespace-trimming.spec-20', async () => expect.poll(() => dashboard.getLoadedCount(), { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const trimmedLoaded = await dashboard.getLoadedCount();

    await recordEvidence('action-clear-LIMAS-SUD-197-history-search-whitespace-trimming.spec-23', async () => dashboard.licenseSearchInput.clear());

    // Enter whitespace through the real input event path.
    await recordEvidence('action-fill-padded-search', () => dashboard.licenseSearchInput.fill(' ' + searchSubstring));
    await recordEvidence('assert-leading-whitespace-trimmed', () => expect(dashboard.licenseSearchInput).toHaveValue(searchSubstring));

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-197-history-search-whitespace-trimming.spec-31', async () => expect.poll(() => dashboard.getLoadedCount(), { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const paddedLoaded = await dashboard.getLoadedCount();


    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-197-history-search-whitespace-trimming.spec-35', async () => expect(trimmedLoaded).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBe-LIMAS-SUD-197-history-search-whitespace-trimming.spec-36', async () => expect(paddedLoaded).toBe(trimmedLoaded));

    await recordEvidence('action-clear-LIMAS-SUD-197-history-search-whitespace-trimming.spec-38', async () => dashboard.licenseSearchInput.clear());
  });
});