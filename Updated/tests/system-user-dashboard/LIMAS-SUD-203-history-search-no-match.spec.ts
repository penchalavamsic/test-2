import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-203: should show zero loaded results when searching nonexistent text in history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-203-history-search-no-match.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-203-history-search-no-match.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const nonexistent = 'xyznomatch2026';
    await recordEvidence('action-fill-LIMAS-SUD-203-history-search-no-match.spec-18', async () => dashboard.licenseSearchInput.fill(nonexistent));

    await recordEvidence('assert-toPass-LIMAS-SUD-203-history-search-no-match.spec-20', async () => expect(async () => {
      const loaded = await dashboard.getLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-203-history-search-no-match.spec-22', async () => expect(loaded).toBe(0));
    }).toPass({ timeout: 10_000 }));

    const noMatchMessage = page.getByText('No matching processed requests in loaded pages');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-203-history-search-no-match.spec-26', async () => expect(noMatchMessage).toBeVisible());

    const scrollHint = page.getByText('Scroll down to load more — a match may appear.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-203-history-search-no-match.spec-29', async () => expect(scrollHint).toBeVisible());

    await recordEvidence('action-clear-LIMAS-SUD-203-history-search-no-match.spec-31', async () => dashboard.licenseSearchInput.clear());

    await recordEvidence('assert-toPass-LIMAS-SUD-203-history-search-no-match.spec-33', async () => expect(async () => {
      const restoredLoaded = await dashboard.getLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-203-history-search-no-match.spec-35', async () => expect(restoredLoaded).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));
  });
});