import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-408: Matches And Total Counts Are Numeric And Non-Negative', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-408-matches-and-total-counts-are-numeric-and-non-negative.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_EMAIL);
      await dashboard.verifyExpiringSearchResults();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-408-matches-and-total-counts-are-numeric-and-non-negative.spec-19', async () => expect(await dashboard.getExpiringResultCount()).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-408-matches-and-total-counts-are-numeric-and-non-negative.spec-20', async () => expect(await dashboard.getExpiringResultTotal()).toBeGreaterThanOrEqual(0));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
