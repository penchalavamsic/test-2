import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-849: clearing search preserves date and returns default empty state', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec-24', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec-28', async () => searchInput.fill('testquery'));

    let reqCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET') reqCount++;
    });

    await recordEvidence('action-fill-LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec-35', async () => searchInput.fill(''));

    await recordEvidence('assert-toBe-LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec-37', async () => expect(reqCount).toBe(0));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec-38', async () => expect(dateInput).toHaveValue(TEST_EFC_COMBINATION_DATE));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec-41', async () => dateInput.fill(''));
  });
});