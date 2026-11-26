import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-333: Selected Future Date Appears In Field In Live Format', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-333-expiring-date-future-display-format.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-333-expiring-date-future-display-format.spec-17', async () => expect(dashboard.expiresBeforeInput).toHaveValue(/^\d{4}-\d{2}-\d{2}$/));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-333-expiring-date-future-display-format.spec-18', async () => expect(dashboard.expiresBeforeInput).toHaveValue(dates.TEST_FUTURE_DATE));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
