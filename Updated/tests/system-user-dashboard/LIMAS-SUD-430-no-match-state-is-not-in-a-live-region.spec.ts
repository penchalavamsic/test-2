import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-430: No-Match State Is Not In A Live Region', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-430-no-match-state-is-not-in-a-live-region.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_NO_MATCH_VALUE);
      await flow.verifyExpiringNoMatchState();
      await recordEvidence('assert-toBe-LIMAS-SUD-430-no-match-state-is-not-in-a-live-region.spec-19', async () => expect(await dashboard.isInsideLiveRegion(dashboard.expiringResultCountText)).toBe(false));
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-430-no-match-state-is-not-in-a-live-region.spec-20', async () => expect(dashboard.alertMessages).toHaveCount(0));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
