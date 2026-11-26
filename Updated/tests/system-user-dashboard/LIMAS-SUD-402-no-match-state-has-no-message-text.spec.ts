import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-402: No-Match State Has No Message Text', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-402-no-match-state-has-no-message-text.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_NO_MATCH_VALUE);
      await flow.verifyExpiringNoMatchState();
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-402-no-match-state-has-no-message-text.spec-19', async () => expect(page.getByText(/no (?:matching|results|records|licenses)|not found/i)).toHaveCount(0));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
