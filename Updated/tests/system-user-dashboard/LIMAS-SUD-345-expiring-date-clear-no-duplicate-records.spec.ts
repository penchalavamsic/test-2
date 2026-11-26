import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-345: Clearing Date Leaves No Duplicate Records', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-345-expiring-date-clear-no-duplicate-records.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
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
      await recordEvidence('assert-toBe-LIMAS-SUD-345-expiring-date-clear-no-duplicate-records.spec-21', async () => expect.poll(() => flow.getExpiringLicenseLoadedCount()).toBe(baselineLoaded));
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-345-expiring-date-clear-no-duplicate-records.spec-22', async () => expect(dashboard.extendButtons).toHaveCount(baselineLoaded));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
