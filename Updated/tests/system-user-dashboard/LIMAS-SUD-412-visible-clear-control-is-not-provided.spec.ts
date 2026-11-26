import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-412: Visible Clear Control Is Not Provided', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-412-visible-clear-control-is-not-provided.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      const wrapper = dashboard.expiringSearchInput.locator('..');
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-412-visible-clear-control-is-not-provided.spec-19', async () => expect(wrapper.getByRole('button')).toHaveCount(0));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
