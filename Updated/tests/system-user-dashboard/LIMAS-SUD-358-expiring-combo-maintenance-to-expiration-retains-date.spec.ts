import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-358: Switching Back To Expiration Retains Selected Date', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-358-expiring-combo-maintenance-to-expiration-retains-date.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await flow.selectExpirationFilter();
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-358-expiring-combo-maintenance-to-expiration-retains-date.spec-19', async () => expect(dashboard.expiresBeforeInput).toHaveValue(dates.TEST_FUTURE_DATE));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
