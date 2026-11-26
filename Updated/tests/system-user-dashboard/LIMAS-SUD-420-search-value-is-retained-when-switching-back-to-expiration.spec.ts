import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-420: Search Value Is Retained When Switching Back To Expiration', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-420-search-value-is-retained-when-switching-back-to-expiration.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_EMAIL);
      await flow.selectMaintenanceFilter();
      await flow.selectExpirationFilter();
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-420-search-value-is-retained-when-switching-back-to-expiration.spec-20', async () => expect(dashboard.expiringSearchInput).toHaveValue(data.TEST_USER_EMAIL));
      await flow.verifyExpiringSearchResults({ value: data.TEST_USER_EMAIL, baselineRecords: baseline.records, source, strict: true });
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
