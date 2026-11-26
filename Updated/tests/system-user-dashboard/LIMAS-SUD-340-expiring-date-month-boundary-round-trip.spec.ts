import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-340: Month Boundary Date Is Retained In Field', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-340-expiring-date-month-boundary-round-trip.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.setExpiresBeforeDate(dates.TEST_MONTH_BOUNDARY_DATE);
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-340-expiring-date-month-boundary-round-trip.spec-17', async () => expect(dashboard.expiresBeforeInput).toHaveValue(dates.TEST_MONTH_BOUNDARY_DATE));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
