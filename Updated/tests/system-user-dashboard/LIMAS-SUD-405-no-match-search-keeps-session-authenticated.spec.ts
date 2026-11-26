import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-405: No-Match Search Keeps Session Authenticated', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-405-no-match-search-keeps-session-authenticated.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_NO_MATCH_VALUE);
      await recordEvidence('assert-toHaveURL-LIMAS-SUD-405-no-match-search-keeps-session-authenticated.spec-18', async () => expect(page).toHaveURL(/\/system-user-dashboard/));
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-405-no-match-search-keeps-session-authenticated.spec-19', async () => expect(dashboard.heading).toBeVisible());
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
