import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-281: should display the exact subtitle text', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    await recordEvidence('assert-toHaveText-LIMAS-SUD-281-expiring-section-subtitle-text.spec-11', async () => expect(dashboard.expiringSectionSubtitle).toHaveText('Review and extend licenses approaching expiration.'));
  });
});