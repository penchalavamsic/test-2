import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Large Result Set', () => {
  test('LIMAS-SUD-436: No Duplicate Records Are Rendered', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-436-no-duplicate-records.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await dashboard.verifyFilterResultsUpdated();
      await flow.selectExpirationFilter();
      await dashboard.verifyFilterResultsUpdated();
      await flow.verifyExpiringRecordsAreUnique();
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
