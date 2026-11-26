import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-428: Search Result Changes Are Not In A Live Region', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-428-search-result-changes-are-not-in-a-live-region.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      await dashboard.verifyExpiringSearchResults();
      await recordEvidence('assert-toBe-LIMAS-SUD-428-search-result-changes-are-not-in-a-live-region.spec-19', async () => expect(await dashboard.isInsideLiveRegion(dashboard.extendButtons.first())).toBe(false));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
