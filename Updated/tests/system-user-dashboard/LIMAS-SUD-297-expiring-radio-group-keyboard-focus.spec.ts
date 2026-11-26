import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-297: should focus the Expiration radio via Tab from the expiring card', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    // Tab from the selected card into the radio group
    await recordEvidence('action-focus-LIMAS-SUD-297-expiring-radio-group-keyboard-focus.spec-12', async () => dashboard.expiringLicensesCard.focus());
    await recordEvidence('action-press-LIMAS-SUD-297-expiring-radio-group-keyboard-focus.spec-13', async () => page.keyboard.press('Tab'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-297-expiring-radio-group-keyboard-focus.spec-14', async () => expect(dashboard.expirationRadio).toBeFocused());
  });
});