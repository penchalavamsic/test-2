import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-373: Typing Filters Records Without Pressing Enter', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-373-typing-filters-records-without-pressing-enter.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      await recordEvidence('assert-toHaveText-LIMAS-SUD-373-typing-filters-records-without-pressing-enter.spec-18', async () => expect(dashboard.expiringResultCountText).toHaveText(/matches/i));
      await dashboard.verifyExpiringSearchResults();
      await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-373-typing-filters-records-without-pressing-enter.spec-20', async () => expect(await dashboard.extendButtons.count()).toBeLessThanOrEqual(baseline.loaded));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
