import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-847: search value persists after date-triggered API response', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec-20', async () => searchInput.fill('testquery'));

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec-27', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec-30', async () => expect(searchInput).toHaveValue('testquery'));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec-33', async () => searchInput.fill(''));
    await recordEvidence('action-fill-LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec-34', async () => dateInput.fill(''));
  });
});