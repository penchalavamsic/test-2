import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-310: should focus the expiring search input via Tab from the User Licenses button', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    await recordEvidence('action-focus-LIMAS-SUD-310-expiring-expiring-search-keyboard-focus.spec-11', async () => dashboard.userLicensesButton.focus());
    await recordEvidence('action-press-LIMAS-SUD-310-expiring-expiring-search-keyboard-focus.spec-12', async () => page.keyboard.press('Tab'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-310-expiring-expiring-search-keyboard-focus.spec-13', async () => expect(dashboard.expiringSearchInput).toBeFocused());
  });
});