import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-347: Clearing Date Keeps Session Authenticated', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-347-expiring-date-clear-session-authenticated.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      const baselineLoaded = await flow.getExpiringLicenseLoadedCount();
      const baselineTotal = await flow.getExpiringLicenseTotalCount();
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await flow.verifyFilterResultsUpdated();
      await flow.clearExpiresBeforeDate();
      await recordEvidence('assert-toHaveURL-LIMAS-SUD-347-expiring-date-clear-session-authenticated.spec-21', async () => expect(page).toHaveURL(/\/system-user-dashboard/));
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-347-expiring-date-clear-session-authenticated.spec-22', async () => expect(dashboard.heading).toBeVisible());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
