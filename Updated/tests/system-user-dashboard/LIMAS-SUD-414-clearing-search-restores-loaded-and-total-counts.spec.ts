import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-414: Clearing Search Restores Loaded And Total Counts', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-414-clearing-search-restores-loaded-and-total-counts.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
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
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-414-clearing-search-restores-loaded-and-total-counts.spec-20', async () => expect(dashboard.expiringCountText).toBeVisible());
      await recordEvidence('assert-toBe-LIMAS-SUD-414-clearing-search-restores-loaded-and-total-counts.spec-21', async () => expect(await dashboard.getExpiringLicenseLoadedCount()).toBe(baseline.loaded));
      await recordEvidence('assert-toBe-LIMAS-SUD-414-clearing-search-restores-loaded-and-total-counts.spec-22', async () => expect(await dashboard.getExpiringLicenseTotalCount()).toBe(baseline.total));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
