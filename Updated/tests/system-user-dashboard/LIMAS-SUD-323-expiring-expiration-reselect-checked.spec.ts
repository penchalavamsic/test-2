import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-323: Reselecting Expiration Restores Checked State', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-323-expiring-expiration-reselect-checked.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await flow.selectExpirationFilter();
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-323-expiring-expiration-reselect-checked.spec-16', async () => expect(dashboard.expirationRadio).toBeChecked());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
