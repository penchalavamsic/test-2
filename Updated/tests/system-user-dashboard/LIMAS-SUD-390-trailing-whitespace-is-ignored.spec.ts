import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getWhitespaceSearchValues } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-390: Trailing Whitespace Is Ignored', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-390-trailing-whitespace-is-ignored.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      await dashboard.verifyExpiringSearchResults();
      const exact = await flow.readVisibleKeys();
      await flow.searchExpiringLicenses(getWhitespaceSearchValues(data.TEST_USER_NAME).TEST_TRAILING_WHITESPACE_VALUE);
      await flow.verifyVisibleRecordKeys(exact);
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
