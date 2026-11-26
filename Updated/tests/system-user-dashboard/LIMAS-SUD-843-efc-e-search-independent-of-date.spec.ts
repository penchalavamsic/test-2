import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-E', () => {
  test('LIMAS-SUD-843: search value independent of date filter change', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-843-efc-e-search-independent-of-date.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcSearch = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-843-efc-e-search-independent-of-date.spec-17', async () => efcSearch.fill('testquery'));

    const today = new Date();
    const pastDate = [
      today.getFullYear() - 1,
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-');

    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-843-efc-e-search-independent-of-date.spec-30', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(pastDate));
    await resp;

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-843-efc-e-search-independent-of-date.spec-33', async () => expect(efcSearch).toHaveValue('testquery'));

    // Restore both
    await recordEvidence('action-fill-LIMAS-SUD-843-efc-e-search-independent-of-date.spec-36', async () => efcSearch.fill(''));
    await recordEvidence('action-fill-LIMAS-SUD-843-efc-e-search-independent-of-date.spec-37', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(''));
  });
});