import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getCaseVariant } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-387: Search Is Case-Insensitive For User Name', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-387-search-is-case-insensitive-for-user-name.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
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
      const variant = getCaseVariant(data.TEST_USER_NAME);
      await flow.searchExpiringLicenses(variant);
      await flow.verifyVisibleRecordKeys(exact);
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
