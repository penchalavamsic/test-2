import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-E', () => {
  test('LIMAS-SUD-835: filling search sends no flconfig api request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-835-efc-e-client-side-no-request.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcSearch = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });

    let reqCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET') reqCount++;
    });

    await recordEvidence('action-fill-LIMAS-SUD-835-efc-e-client-side-no-request.spec-23', async () => efcSearch.fill('testquery'));

    // Verify no additional flconfig GET arrived after fill
    await recordEvidence('assert-toBe-LIMAS-SUD-835-efc-e-client-side-no-request.spec-26', async () => expect(reqCount).toBe(0));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-835-efc-e-client-side-no-request.spec-29', async () => efcSearch.fill(''));
  });
});