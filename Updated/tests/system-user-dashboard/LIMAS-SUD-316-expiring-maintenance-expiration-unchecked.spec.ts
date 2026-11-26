import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-316: Selecting Maintenance Unchecks Expiration', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-316-expiring-maintenance-expiration-unchecked.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-316-expiring-maintenance-expiration-unchecked.spec-15', async () => expect(dashboard.expirationRadio).not.toBeChecked());
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-316-expiring-maintenance-expiration-unchecked.spec-16', async () => expect(dashboard.maintenanceRadio).toBeChecked());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
