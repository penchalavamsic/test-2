import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-257: should show switch unchecked after disableHistory', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Enable history first so we have a meaningful toggle
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.disableHistory();
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-257-history-switch-unchecked-state.spec-14', async () => expect(dashboard.licenseHistorySwitch).not.toBeChecked());
  });
});