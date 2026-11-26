import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { recordMatchesValue } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-418: Search Under Maintenance Filters Maintenance Records', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-418-search-under-maintenance-filters-maintenance-records.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.selectMaintenanceFilter();
      await dashboard.verifyFilterResultsUpdated();
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      await dashboard.verifyExpiringSearchResults();
      const shown = await flow.readVisibleRecords();
      for (const record of shown) {
        await recordEvidence('assert-toBe-LIMAS-SUD-418-search-under-maintenance-filters-maintenance-records.spec-24', async () => expect(recordMatchesValue(record, data.TEST_USER_NAME)).toBe(true));
      }
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
