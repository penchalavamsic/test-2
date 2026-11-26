import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-855: combined date and no-match search shows empty state', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-855-efc-f-combined-no-match-state.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE, TEST_EFC_SEARCH_NO_MATCH } = getEFCCombinedRuntimeData();

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-855-efc-f-combined-no-match-state.spec-24', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-855-efc-f-combined-no-match-state.spec-28', async () => searchInput.fill(TEST_EFC_SEARCH_NO_MATCH));

    const noMatchMessage = page.getByText('No matching configurations');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-855-efc-f-combined-no-match-state.spec-31', async () => expect(noMatchMessage).toBeVisible());

    const countText = page.getByText(/0 loaded/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-855-efc-f-combined-no-match-state.spec-34', async () => expect(countText).toBeVisible());

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-855-efc-f-combined-no-match-state.spec-37', async () => searchInput.fill(''));
    await recordEvidence('action-fill-LIMAS-SUD-855-efc-f-combined-no-match-state.spec-38', async () => dateInput.fill(''));
  });
});