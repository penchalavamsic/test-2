import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-289: should have loaded count equal to total count (all licenses displayed)', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const loaded = await dashboard.getExpiringLicenseLoadedCount();
    const total = await dashboard.getExpiringLicenseTotalCount();
    await recordEvidence('assert-toBe-LIMAS-SUD-289-expiring-card-count-total-consistency.spec-13', async () => expect(loaded).toBe(total));
  });
});