import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-284: should render heading, subtitle, and count text after section load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-284-expiring-initial-render-complete.spec-11', async () => expect(dashboard.expiringSectionHeading).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-284-expiring-initial-render-complete.spec-12', async () => expect(dashboard.expiringSectionSubtitle).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-284-expiring-initial-render-complete.spec-13', async () => expect(dashboard.expiringCountText).toBeVisible());
  });
});