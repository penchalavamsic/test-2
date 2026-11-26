import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-850: clearing date triggers default-date GET and preserves search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec-20', async () => searchInput.fill('testquery'));

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    let resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec-27', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/e/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec-34', async () => dateInput.fill(''));
    await resp;

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec-37', async () => expect(searchInput).toHaveValue('testquery'));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec-40', async () => searchInput.fill(''));
  });
});