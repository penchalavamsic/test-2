import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses User Licenses Navigation', () => {
  test('LIMAS-SUD-479: Navigation Occurs In The Same Tab', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-479-user-licenses-same-tab.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      const before = dashboard.page.context().pages().length;
            await recordEvidence('action-click-LIMAS-SUD-479-user-licenses-same-tab.spec-15', async () => dashboard.userLicensesButton.click());
            await dashboard.page.waitForURL(/\/users-licenses/);
            await recordEvidence('assert-toBe-LIMAS-SUD-479-user-licenses-same-tab.spec-17', async () => expect(dashboard.page.context().pages().length).toBe(before));
    } finally {
      if (new URL(dashboard.page.url()).pathname !== '/system-user-dashboard') {
        await recordEvidence('action-goBack-LIMAS-SUD-479-user-licenses-same-tab.spec-19', async () => dashboard.page.goBack());
      }
            await dashboard.waitForLoad();
            await recordEvidence('assert-toHaveURL-LIMAS-SUD-479-user-licenses-same-tab.spec-21', async () => expect(dashboard.page).toHaveURL(/\/system-user-dashboard/));
            await dashboard.waitForFullRender();
            await flow.selectExpiringLicenses();
            await dashboard.waitForExpiringLicenseLoad();
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-479-user-licenses-same-tab.spec-25', async () => expect(dashboard.expirationRadio).toBeChecked());
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-479-user-licenses-same-tab.spec-26', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-479-user-licenses-same-tab.spec-27', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-479-user-licenses-same-tab.spec-28', async () => expect(dashboard.expiringSearchInput).toHaveValue(''));
    }
  });
});
