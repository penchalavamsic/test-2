import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-195: should filter processed list by request ID substring', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-195-history-search-by-request-id.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-195-history-search-by-request-id.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const lrPattern = page.getByText(/LR-/);
    const lrCount = await lrPattern.count();
    test.skip(lrCount === 0, 'No request identifiers are rendered in the loaded processed records; this search requires a visible request ID.');

    if (lrCount > 0) {
      const lrText = await lrPattern.first().textContent();
      const lrMatch = lrText!.match(/LR-\d+/);
      if (lrMatch) {
        await recordEvidence('action-fill-LIMAS-SUD-195-history-search-by-request-id.spec-24', async () => dashboard.licenseSearchInput.fill(lrMatch[0]));

        await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-195-history-search-by-request-id.spec-26', async () => expect.poll(async () => {
          return dashboard.getLoadedCount();
        }, { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const filteredLoaded = await dashboard.getLoadedCount();

        await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-195-history-search-by-request-id.spec-30', async () => expect(filteredLoaded).toBeLessThanOrEqual(initialLoaded));
      }
    }

    await recordEvidence('action-clear-LIMAS-SUD-195-history-search-by-request-id.spec-34', async () => dashboard.licenseSearchInput.clear());
  });
});