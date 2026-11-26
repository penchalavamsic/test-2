import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses User Licenses Navigation', () => {
  test('LIMAS-SUD-471: User Licenses Button Is Keyboard Focusable', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await recordEvidence('action-focus-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-14', async () => dashboard.userLicensesButton.focus());
            const ti = await dashboard.userLicensesButton.evaluate(el => (el as HTMLElement).tabIndex);
            await recordEvidence('assert-toBe-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-16', async () => expect(ti).toBe(0));
    } finally {
      if (new URL(dashboard.page.url()).pathname !== '/system-user-dashboard') {
        await recordEvidence('action-goBack-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-18', async () => dashboard.page.goBack());
      }
            await dashboard.waitForLoad();
            await recordEvidence('assert-toHaveURL-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-20', async () => expect(dashboard.page).toHaveURL(/\/system-user-dashboard/));
            await dashboard.waitForFullRender();
            await flow.selectExpiringLicenses();
            await dashboard.waitForExpiringLicenseLoad();
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-24', async () => expect(dashboard.expirationRadio).toBeChecked());
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-25', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-26', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-471-user-licenses-button-keyboard-focusable.spec-27', async () => expect(dashboard.expiringSearchInput).toHaveValue(''));
    }
  });
});
