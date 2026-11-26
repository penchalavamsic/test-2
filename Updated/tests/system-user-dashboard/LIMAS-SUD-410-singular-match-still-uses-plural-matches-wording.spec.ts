import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-410: Singular Match Still Uses Plural Matches Wording', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-410-singular-match-still-uses-plural-matches-wording.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_EXPIRING_RECORD_IDENTIFIER);
      await dashboard.verifyExpiringSearchResults();
      test.skip((await dashboard.extendButtons.count()) !== 1, 'Requires deterministic runtime search data: identifier did not isolate one record');
      await recordEvidence('assert-toHaveText-LIMAS-SUD-410-singular-match-still-uses-plural-matches-wording.spec-20', async () => expect(dashboard.expiringResultCountText).toHaveText(/^\s*1\s*matches/i));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
