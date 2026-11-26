import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-E', () => {
  test('LIMAS-SUD-832: efc search input can receive keyboard focus', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-832-efc-e-search-keyboard-focus.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcSearch = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-focus-LIMAS-SUD-832-efc-e-search-keyboard-focus.spec-17', async () => efcSearch.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-832-efc-e-search-keyboard-focus.spec-18', async () => expect(efcSearch).toBeFocused());
  });
});