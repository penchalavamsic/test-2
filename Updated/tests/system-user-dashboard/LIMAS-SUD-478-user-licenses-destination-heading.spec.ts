import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses User Licenses Navigation', () => {
  test('LIMAS-SUD-478: Destination Page Has Heading User And License Hub', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-478-user-licenses-destination-heading.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await recordEvidence('action-click-LIMAS-SUD-478-user-licenses-destination-heading.spec-14', async () => dashboard.userLicensesButton.click());
            await dashboard.page.waitForURL(/\/users-licenses/);
            await recordEvidence('assert-toBeVisible-LIMAS-SUD-478-user-licenses-destination-heading.spec-16', async () => expect(dashboard.page.getByRole('heading', { name: 'User & License Hub', level: 1 })).toBeVisible());
    } finally {
      if (new URL(dashboard.page.url()).pathname !== '/system-user-dashboard') {
        await recordEvidence('action-goBack-LIMAS-SUD-478-user-licenses-destination-heading.spec-18', async () => dashboard.page.goBack());
      }
            await dashboard.waitForLoad();
            await recordEvidence('assert-toHaveURL-LIMAS-SUD-478-user-licenses-destination-heading.spec-20', async () => expect(dashboard.page).toHaveURL(/\/system-user-dashboard/));
            await dashboard.waitForFullRender();
            await flow.selectExpiringLicenses();
            await dashboard.waitForExpiringLicenseLoad();
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-478-user-licenses-destination-heading.spec-24', async () => expect(dashboard.expirationRadio).toBeChecked());
            await recordEvidence('assert-toBeChecked-LIMAS-SUD-478-user-licenses-destination-heading.spec-25', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-478-user-licenses-destination-heading.spec-26', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-478-user-licenses-destination-heading.spec-27', async () => expect(dashboard.expiringSearchInput).toHaveValue(''));
    }
  });
});
