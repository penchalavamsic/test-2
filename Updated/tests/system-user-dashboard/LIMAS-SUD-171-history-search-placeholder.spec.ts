import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-171: should show search placeholder after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-171-history-search-placeholder.spec-9', async () => dashboard.licenseHistorySwitch.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-171-history-search-placeholder.spec-11', async () => expect(dashboard.licenseSearchInput).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-171-history-search-placeholder.spec-12', async () => expect(dashboard.licenseSearchInput).toHaveAttribute('placeholder', 'Search license requests...'));
  });
});