import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-288: should report a positive total license count', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const total = await dashboard.getExpiringLicenseTotalCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-288-expiring-total-count-numeric.spec-12', async () => expect(total).toBeGreaterThan(0));
  });
});