import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-299: should have exactly one checked radio — Expiration checked and Maintenance unchecked', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    await recordEvidence('assert-toBeChecked-LIMAS-SUD-299-expiring-single-radio-selection.spec-11', async () => expect(dashboard.expirationRadio).toBeChecked());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-299-expiring-single-radio-selection.spec-12', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
  });
});