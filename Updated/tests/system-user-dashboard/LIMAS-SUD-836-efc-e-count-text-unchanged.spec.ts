import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-E', () => {
  test('LIMAS-SUD-836: count text unchanged after search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-836-efc-e-count-text-unchanged.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcSearch = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-836-efc-e-count-text-unchanged.spec-17', async () => efcSearch.fill('test'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-836-efc-e-count-text-unchanged.spec-18', async () => expect(page.getByText(/0 loaded · 0 total configurations/)).toBeVisible());

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-836-efc-e-count-text-unchanged.spec-21', async () => efcSearch.fill(''));
  });
});