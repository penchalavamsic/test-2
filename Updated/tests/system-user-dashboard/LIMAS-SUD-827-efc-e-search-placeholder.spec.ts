import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-E', () => {
  test('LIMAS-SUD-827: efc search input has correct placeholder', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-827-efc-e-search-placeholder.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcSearch = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-827-efc-e-search-placeholder.spec-17', async () => expect(efcSearch).toHaveAttribute('placeholder', 'Search by User Group or Profile…'));
  });
});