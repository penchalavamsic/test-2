import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-342: Clearing Date Returns Field To Empty', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-342-expiring-date-clear-field-empty.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await flow.clearExpiresBeforeDate();
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-342-expiring-date-clear-field-empty.spec-18', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
