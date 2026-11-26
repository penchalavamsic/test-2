import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-363: Default Filter State Is Restored After Changes', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-363-expiring-default-filter-state-restoration.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await flow.clearExpiresBeforeDate();
      await flow.selectExpirationFilter();
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-363-expiring-default-filter-state-restoration.spec-20', async () => expect(dashboard.expirationRadio).toBeChecked());
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-363-expiring-default-filter-state-restoration.spec-21', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-363-expiring-default-filter-state-restoration.spec-22', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-363-expiring-default-filter-state-restoration.spec-23', async () => expect(dashboard.expiringSearchInput).toHaveValue(''));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
