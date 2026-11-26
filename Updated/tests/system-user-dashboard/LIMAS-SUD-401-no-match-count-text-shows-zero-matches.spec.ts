import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-401: No-Match Count Text Shows Zero Matches', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-401-no-match-count-text-shows-zero-matches.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_NO_MATCH_VALUE);
      await recordEvidence('assert-toHaveText-LIMAS-SUD-401-no-match-count-text-shows-zero-matches.spec-18', async () => expect(dashboard.expiringResultCountText).toHaveText(/^\s*0\s*matches/i));
      await recordEvidence('assert-toBe-LIMAS-SUD-401-no-match-count-text-shows-zero-matches.spec-19', async () => expect(await dashboard.getExpiringResultTotal()).toBe(baseline.total));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
