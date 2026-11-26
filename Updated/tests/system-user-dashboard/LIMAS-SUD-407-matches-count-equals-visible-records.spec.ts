import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-407: Matches Count Equals Visible Records', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-407-matches-count-equals-visible-records.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_HARDWARE_ID);
      await dashboard.verifyExpiringSearchResults();
      await recordEvidence('assert-toBe-LIMAS-SUD-407-matches-count-equals-visible-records.spec-19', async () => expect(await dashboard.getExpiringResultCount()).toBe(await dashboard.extendButtons.count()));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
