import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-845: filling search after date set sends no additional flconfig GET', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-845-efc-f-search-after-date-no-request.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-845-efc-f-search-after-date-no-request.spec-24', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    let reqCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET') reqCount++;
    });

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-845-efc-f-search-after-date-no-request.spec-33', async () => searchInput.fill('testquery'));

    await recordEvidence('assert-toBe-LIMAS-SUD-845-efc-f-search-after-date-no-request.spec-35', async () => expect(reqCount).toBe(0));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-845-efc-f-search-after-date-no-request.spec-38', async () => searchInput.fill(''));
    await recordEvidence('action-fill-LIMAS-SUD-845-efc-f-search-after-date-no-request.spec-39', async () => dateInput.fill(''));
  });
});