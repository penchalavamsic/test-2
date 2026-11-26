import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-E', () => {
  test('LIMAS-SUD-830: efc search input has a search icon', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-830-efc-e-search-icon.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcSearch = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    const svgCount = await efcSearch.locator('..').locator('svg').count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-830-efc-e-search-icon.spec-18', async () => expect(svgCount).toBeGreaterThan(0));
  });
});