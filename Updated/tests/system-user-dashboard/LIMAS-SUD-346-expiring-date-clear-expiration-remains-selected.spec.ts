import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-346: Clearing Date Keeps Expiration Selected', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-346-expiring-date-clear-expiration-remains-selected.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
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
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-346-expiring-date-clear-expiration-remains-selected.spec-21', async () => expect(dashboard.expirationRadio).toBeChecked());
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-346-expiring-date-clear-expiration-remains-selected.spec-22', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
