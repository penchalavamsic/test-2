import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-857: clearing both date and search returns default empty state', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    let resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec-24', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec-28', async () => searchInput.fill('testquery'));

    await recordEvidence('action-fill-LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec-30', async () => searchInput.fill(''));

    resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/e/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec-36', async () => dateInput.fill(''));
    await resp;

    const defaultEmptyMessage = page.getByText('No expiring floating configurations found');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec-40', async () => expect(defaultEmptyMessage).toBeVisible());

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec-43', async () => searchInput.fill(''));
  });
});