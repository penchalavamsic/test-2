import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-162: should have accessible name and role="switch"', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-162-history-switch-accessible-name.spec-9', async () => expect(dashboard.licenseHistorySwitch).toBeVisible());
    await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-162-history-switch-accessible-name.spec-10', async () => expect(dashboard.licenseHistorySwitch).toHaveAccessibleName(/Show License Request History/i));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-162-history-switch-accessible-name.spec-11', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('role', 'switch'));
  });
});