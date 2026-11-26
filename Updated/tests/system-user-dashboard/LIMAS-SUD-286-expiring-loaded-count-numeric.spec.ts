import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-286: should report a positive loaded license count', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const loaded = await dashboard.getExpiringLicenseLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-286-expiring-loaded-count-numeric.spec-12', async () => expect(loaded).toBeGreaterThan(0));
  });
});