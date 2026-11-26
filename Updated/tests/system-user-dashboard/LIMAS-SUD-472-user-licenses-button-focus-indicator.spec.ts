import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses User Licenses Navigation', () => {
  test('LIMAS-SUD-472: User Licenses Button Has Visible Focus Indicator', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await recordEvidence('action-focus-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-14', async () => dashboard.userLicensesButton.focus());
      await recordEvidence('action-keyboard-focus-user-licenses', async () => {
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
      });
      await recordEvidence('assert-user-licenses-keyboard-focus', () => expect(dashboard.userLicensesButton).toBeFocused());
            const hasIndicator = await dashboard.userLicensesButton.evaluate(el => {
              const cs = getComputedStyle(el);
              return (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
            });
            await recordEvidence('assert-toBe-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-19', async () => expect(hasIndicator).toBe(true));
    } finally {
      if (new URL(dashboard.page.url()).pathname !== '/system-user-dashboard') {
        await recordEvidence('action-goBack-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-21', async () => dashboard.page.goBack());
      }
            await dashboard.waitForLoad();
            await recordEvidence('assert-toHaveURL-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-23', async () => expect(dashboard.page).toHaveURL(/\/system-user-dashboard/));
            await dashboard.waitForFullRender();
            await flow.selectExpiringLicenses();
            await dashboard.waitForExpiringLicenseLoad();
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-27', async () => expect(dashboard.expirationRadio).toBeChecked());
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-28', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-29', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-472-user-licenses-button-focus-indicator.spec-30', async () => expect(dashboard.expiringSearchInput).toHaveValue(''));
    }
  });
});
