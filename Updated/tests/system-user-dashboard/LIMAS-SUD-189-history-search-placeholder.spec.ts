import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-189: should show search placeholder after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-189-history-search-placeholder.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-189-history-search-placeholder.spec-13', async () => expect(dashboard.licenseSearchInput).toHaveAttribute('placeholder', 'Search license requests...'));
  });
});