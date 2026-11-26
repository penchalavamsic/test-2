import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-307: should display the expiring license search input', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-307-expiring-expiring-search-visibility.spec-11', async () => expect(dashboard.expiringSearchInput).toBeVisible());
  });
});