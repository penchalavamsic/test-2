import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-356: Switching To Maintenance Retains Selected Date', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-356-expiring-combo-expiration-to-maintenance-retains-date.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await flow.selectMaintenanceFilter();
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-356-expiring-combo-expiration-to-maintenance-retains-date.spec-18', async () => expect(dashboard.expiresBeforeInput).toHaveValue(dates.TEST_FUTURE_DATE));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
