import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-334: Selecting Future Date Sends Expiration Date Parameter', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-334-expiring-date-future-request-uses-expiration-date-parameter.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      const response = await dashboard.captureUsersResponse(() => flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE));
      await recordEvidence('assert-toBe-LIMAS-SUD-334-expiring-date-future-request-uses-expiration-date-parameter.spec-17', async () => expect(response.status).toBe(200));
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-334-expiring-date-future-request-uses-expiration-date-parameter.spec-18', async () => expect(response.url.searchParams.get('expirationDate')).toBeTruthy());
      await recordEvidence('assert-toBeFalsy-LIMAS-SUD-334-expiring-date-future-request-uses-expiration-date-parameter.spec-19', async () => expect(response.url.searchParams.get('maintenanceDate')).toBeFalsy());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
