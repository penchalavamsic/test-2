import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-406: Count Text Switches To Matches Wording While Searching', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-406-count-text-switches-to-matches-wording-while-searching.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await recordEvidence('assert-toHaveText-LIMAS-SUD-406-count-text-switches-to-matches-wording-while-searching.spec-17', async () => expect(dashboard.expiringResultCountText).toHaveText(/loaded/i));
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      await recordEvidence('assert-toHaveText-LIMAS-SUD-406-count-text-switches-to-matches-wording-while-searching.spec-19', async () => expect(dashboard.expiringResultCountText).toHaveText(/matches/i));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
