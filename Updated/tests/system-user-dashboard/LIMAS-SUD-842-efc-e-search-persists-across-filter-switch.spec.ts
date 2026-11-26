import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-E', () => {
  test('LIMAS-SUD-842: search value persists across filter switch', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-842-efc-e-search-persists-across-filter-switch.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcSearch = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-842-efc-e-search-persists-across-filter-switch.spec-17', async () => efcSearch.fill('testquery'));

    const efcFilterGroup = page.getByRole('group', { name: 'Filter by' });
    const maintRadio = efcFilterGroup.getByRole('radio', { name: 'Maintenance' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/m/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-click-LIMAS-SUD-842-efc-e-search-persists-across-filter-switch.spec-25', async () => maintRadio.click());
    await resp;

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-842-efc-e-search-persists-across-filter-switch.spec-28', async () => expect(efcSearch).toHaveValue('testquery'));

    // Restore: clear search, switch back to Expiration
    await recordEvidence('action-fill-LIMAS-SUD-842-efc-e-search-persists-across-filter-switch.spec-31', async () => efcSearch.fill(''));
    const expResp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/e/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-click-LIMAS-SUD-842-efc-e-search-persists-across-filter-switch.spec-36', async () => efcFilterGroup.getByRole('radio', { name: 'Expiration' }).click());
    await expResp;
  });
});