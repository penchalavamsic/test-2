import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-357: Maintenance With Date Sends Maintenance Date Parameter', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-357-expiring-combo-maintenance-with-date-request.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      const response = await dashboard.captureUsersResponse(() => flow.selectMaintenanceFilter());
      await recordEvidence('assert-toBe-LIMAS-SUD-357-expiring-combo-maintenance-with-date-request.spec-18', async () => expect(response.status).toBe(200));
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-357-expiring-combo-maintenance-with-date-request.spec-19', async () => expect(response.url.searchParams.get('maintenanceDate')).toBeTruthy());
      await recordEvidence('assert-toBeFalsy-LIMAS-SUD-357-expiring-combo-maintenance-with-date-request.spec-20', async () => expect(response.url.searchParams.get('expirationDate')).toBeFalsy());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
