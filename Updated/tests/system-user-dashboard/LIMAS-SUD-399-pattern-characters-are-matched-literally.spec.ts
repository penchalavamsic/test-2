import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { recordMatchesValue } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-399: Pattern Characters Are Matched Literally', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-399-pattern-characters-are-matched-literally.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_SPECIAL_CHARACTER_VALUE);
      await dashboard.verifyExpiringSearchResults();
      const expected = baseline.records.filter((r) => recordMatchesValue(r, data.TEST_SPECIAL_CHARACTER_VALUE));
      await recordEvidence('assert-toBe-LIMAS-SUD-399-pattern-characters-are-matched-literally.spec-21', async () => expect(await dashboard.extendButtons.count()).toBe(expected.length));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
