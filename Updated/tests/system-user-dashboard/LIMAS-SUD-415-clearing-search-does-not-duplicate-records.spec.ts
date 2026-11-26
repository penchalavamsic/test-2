import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { recordKeys, countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-415: Clearing Search Does Not Duplicate Records', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-415-clearing-search-does-not-duplicate-records.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      await dashboard.verifyExpiringSearchResults();
      await flow.clearExpiringLicenseSearch();
      await flow.verifyVisibleRecordKeys(recordKeys(baseline.records));
      const records = await flow.readVisibleRecords();
      await recordEvidence('assert-toBe-LIMAS-SUD-415-clearing-search-does-not-duplicate-records.spec-23', async () => expect(countUniqueRecords(records)).toBe(records.length));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
