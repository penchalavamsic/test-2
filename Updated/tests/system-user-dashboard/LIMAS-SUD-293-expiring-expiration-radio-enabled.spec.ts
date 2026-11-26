import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-293: should have the Expiration radio enabled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-293-expiring-expiration-radio-enabled.spec-11', async () => expect(dashboard.expirationRadio).toBeEnabled());
  });
});