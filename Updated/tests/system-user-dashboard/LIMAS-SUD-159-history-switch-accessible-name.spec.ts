import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-159: History switch accessible name', () => {
  test('should have accessible name "Show License Request History"', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-159-history-switch-accessible-name.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-159-history-switch-accessible-name.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-159-history-switch-accessible-name.spec-11', async () => expect(dashboard.licenseHistorySwitch).toBeVisible());
    await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-159-history-switch-accessible-name.spec-12', async () => expect(dashboard.licenseHistorySwitch).toHaveAccessibleName(/Show License Request History/i));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-159-history-switch-accessible-name.spec-13', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('role', 'switch'));
  });
});