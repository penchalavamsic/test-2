import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-324: Reselecting Expiration Restores Maintenance Unchecked State', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-324-expiring-expiration-reselect-maintenance-unchecked.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await flow.selectExpirationFilter();
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-324-expiring-expiration-reselect-maintenance-unchecked.spec-16', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
