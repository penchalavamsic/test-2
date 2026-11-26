import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-E', () => {
  test('LIMAS-SUD-837: empty state search heading appears after search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-837-efc-e-empty-state-search-heading.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcSearch = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-837-efc-e-empty-state-search-heading.spec-17', async () => efcSearch.fill('test'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-837-efc-e-empty-state-search-heading.spec-18', async () => expect(page.getByText('No matching configurations')).toBeVisible());

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-837-efc-e-empty-state-search-heading.spec-21', async () => efcSearch.fill(''));
  });
});