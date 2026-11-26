import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-856: count text unchanged during combined operations', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec-24', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec-28', async () => searchInput.fill('testquery'));

    const countText = page.getByText(/0\s+loaded\s*[·•]\s*0\s+total\s+configurations/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec-31', async () => expect(countText).toBeVisible());

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec-34', async () => searchInput.fill(''));
    await recordEvidence('action-fill-LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec-35', async () => dateInput.fill(''));
  });
});