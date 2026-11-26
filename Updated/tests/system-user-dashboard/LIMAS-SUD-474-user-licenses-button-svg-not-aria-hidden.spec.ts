import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses User Licenses Navigation', () => {
  test('LIMAS-SUD-474: External Navigation Icon Is Not Aria-Hidden', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-474-user-licenses-button-svg-not-aria-hidden.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      const ariaHidden = await dashboard.userLicensesButton.locator('svg').getAttribute('aria-hidden');
            await recordEvidence('assert-toBeNull-LIMAS-SUD-474-user-licenses-button-svg-not-aria-hidden.spec-15', async () => expect(ariaHidden).toBeNull());
    } finally {
      if (new URL(dashboard.page.url()).pathname !== '/system-user-dashboard') {
        await recordEvidence('action-goBack-LIMAS-SUD-474-user-licenses-button-svg-not-aria-hidden.spec-17', async () => dashboard.page.goBack());
      }
            await dashboard.waitForLoad();
            await recordEvidence('assert-toHaveURL-LIMAS-SUD-474-user-licenses-button-svg-not-aria-hidden.spec-19', async () => expect(dashboard.page).toHaveURL(/\/system-user-dashboard/));
            await dashboard.waitForFullRender();
            await flow.selectExpiringLicenses();
            await dashboard.waitForExpiringLicenseLoad();
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-474-user-licenses-button-svg-not-aria-hidden.spec-23', async () => expect(dashboard.expirationRadio).toBeChecked());
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-474-user-licenses-button-svg-not-aria-hidden.spec-24', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-474-user-licenses-button-svg-not-aria-hidden.spec-25', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-474-user-licenses-button-svg-not-aria-hidden.spec-26', async () => expect(dashboard.expiringSearchInput).toHaveValue(''));
    }
  });
});
