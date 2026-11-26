import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-319: Selecting Maintenance Moves Date Filter To Maintenance Parameter', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-319-expiring-maintenance-request-uses-maintenance-date-parameter.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      const response = await dashboard.captureUsersResponse(() => flow.selectMaintenanceFilter());
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-319-expiring-maintenance-request-uses-maintenance-date-parameter.spec-15', async () => expect(response.url.searchParams.get('maintenanceDate')).toBeTruthy());
      await recordEvidence('assert-toBeFalsy-LIMAS-SUD-319-expiring-maintenance-request-uses-maintenance-date-parameter.spec-16', async () => expect(response.url.searchParams.get('expirationDate')).toBeFalsy());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
