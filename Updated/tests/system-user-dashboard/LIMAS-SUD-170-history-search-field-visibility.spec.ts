import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-170: should show search input after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-170-history-search-field-visibility.spec-9', async () => dashboard.licenseHistorySwitch.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-170-history-search-field-visibility.spec-11', async () => expect(dashboard.licenseSearchInput).toBeVisible());
  });
});