import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses User Licenses Navigation', () => {
  test('LIMAS-SUD-476: Enter Key Activates The Button And Navigates', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await recordEvidence('action-focus-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-14', async () => dashboard.userLicensesButton.focus());
            await recordEvidence('action-press-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-15', async () => dashboard.page.keyboard.press('Enter'));
            await dashboard.page.waitForURL(/\/users-licenses/);
    } finally {
      if (new URL(dashboard.page.url()).pathname !== '/system-user-dashboard') {
        await recordEvidence('action-goBack-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-18', async () => dashboard.page.goBack());
      }
            await dashboard.waitForLoad();
            await recordEvidence('assert-toHaveURL-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-20', async () => expect(dashboard.page).toHaveURL(/\/system-user-dashboard/));
            await dashboard.waitForFullRender();
            await flow.selectExpiringLicenses();
            await dashboard.waitForExpiringLicenseLoad();
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-24', async () => expect(dashboard.expirationRadio).toBeChecked());
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-25', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-26', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-476-user-licenses-keyboard-enter-navigates.spec-27', async () => expect(dashboard.expiringSearchInput).toHaveValue(''));
    }
  });
});
