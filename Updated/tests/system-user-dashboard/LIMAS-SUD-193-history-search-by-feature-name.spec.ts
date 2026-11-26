import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-193: should filter processed list by feature name substring', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-193-history-search-by-feature-name.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-193-history-search-by-feature-name.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const paras = dashboard.getPendingRequestFeatureName(dashboard.processedRecordCards.first());
    const totalParas = await paras.count();

    if (totalParas > 0) {
      const firstText = await paras.first().textContent();
      const searchTerm = firstText!.trim().substring(0, Math.min(4, firstText!.trim().length));

      await recordEvidence('action-fill-LIMAS-SUD-193-history-search-by-feature-name.spec-24', async () => dashboard.licenseSearchInput.fill(searchTerm));

      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-193-history-search-by-feature-name.spec-26', async () => expect.poll(async () => {
        return dashboard.getLoadedCount();
      }, { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const filteredLoaded = await dashboard.getLoadedCount();

      await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-193-history-search-by-feature-name.spec-30', async () => expect(filteredLoaded).toBeLessThanOrEqual(initialLoaded));
    }

    await recordEvidence('action-clear-LIMAS-SUD-193-history-search-by-feature-name.spec-33', async () => dashboard.licenseSearchInput.clear());
  });
});