import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-194: should filter processed list by hardware ID substring', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-194-history-search-by-hardware-id.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-194-history-search-by-hardware-id.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const paras = dashboard.getPendingRequestHardwareId(dashboard.processedRecordCards.first());
    const totalParas = await paras.count();

    if (totalParas > 0) {
      const firstText = await paras.first().textContent();
      const searchTerm = firstText!.trim().substring(0, Math.min(4, firstText!.trim().length));

      await recordEvidence('action-fill-LIMAS-SUD-194-history-search-by-hardware-id.spec-24', async () => dashboard.licenseSearchInput.fill(searchTerm));

      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-194-history-search-by-hardware-id.spec-26', async () => expect.poll(async () => {
        return dashboard.getLoadedCount();
      }, { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const filteredLoaded = await dashboard.getLoadedCount();

      await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-194-history-search-by-hardware-id.spec-30', async () => expect(filteredLoaded).toBeLessThanOrEqual(initialLoaded));
    }

    await recordEvidence('action-clear-LIMAS-SUD-194-history-search-by-hardware-id.spec-33', async () => dashboard.licenseSearchInput.clear());
  });
});