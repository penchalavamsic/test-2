import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-283: should render the heading parent container', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const headingParent = dashboard.expiringSectionHeading.locator('..');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-283-expiring-section-container.spec-12', async () => expect(headingParent).toBeVisible());
  });
});