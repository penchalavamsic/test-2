import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-374: Pressing Enter Keeps Current Results', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-374-pressing-enter-keeps-current-results.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_EMAIL);
      await dashboard.verifyExpiringSearchResults();
      const before = await flow.readVisibleKeys();
      const tracker = dashboard.trackUsersApiRequests();
      await recordEvidence('action-press-LIMAS-SUD-374-pressing-enter-keeps-current-results.spec-21', async () => dashboard.expiringSearchInput.press('Enter'));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-374-pressing-enter-keeps-current-results.spec-22', async () => expect(dashboard.expiringSearchInput).toHaveValue(data.TEST_USER_EMAIL));
      await flow.verifyVisibleRecordKeys(before);
      await recordEvidence('assert-toBe-LIMAS-SUD-374-pressing-enter-keeps-current-results.spec-24', async () => expect(tracker.count()).toBe(0));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
