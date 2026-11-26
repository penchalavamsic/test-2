import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-848: changing date with populated search triggers one GET for second date', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE, TEST_EFC_COMBINATION_SECOND_DATE } = getEFCCombinedRuntimeData();

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    let resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec-24', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec-28', async () => searchInput.fill('testquery'));

    let reqCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET') reqCount++;
    });

    resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec-39', async () => dateInput.fill(TEST_EFC_COMBINATION_SECOND_DATE));
    await resp;

    await recordEvidence('assert-toBe-LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec-42', async () => expect(reqCount).toBe(1));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec-43', async () => expect(searchInput).toHaveValue('testquery'));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec-46', async () => searchInput.fill(''));
    await recordEvidence('action-fill-LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec-47', async () => dateInput.fill(''));
  });
});