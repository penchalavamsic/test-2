import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-353: Invalid Month Text Is Not Accepted', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-353-expiring-invalid-month-rejected.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      const baselineLoaded = await flow.getExpiringLicenseLoadedCount();
      await dashboard.enterExpiresBeforeText(dates.TEST_INVALID_MONTH_DATE);
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-353-expiring-invalid-month-rejected.spec-18', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-353-expiring-invalid-month-rejected.spec-19', async () => expect(await flow.getExpiringLicenseLoadedCount()).toBe(baselineLoaded));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
