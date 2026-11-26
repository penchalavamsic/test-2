import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getPartialSearchValue } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-381: Partial User Name From Middle Of Value Matches', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-381-partial-user-name-from-middle-of-value-matches.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      const fragment = getPartialSearchValue(data.TEST_USER_NAME);
      await flow.searchExpiringLicenses(fragment);
      await flow.verifyExpiringSearchResults({ value: fragment, baselineRecords: baseline.records, source, strict: false });
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
