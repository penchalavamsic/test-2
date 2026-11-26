import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { recordKeys, recordMatchesValue, getSpecialCharacterSearchValues } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-397: Period Character Filters Records By Visible Text', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-397-period-character-filters-records-by-visible-text.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      const value = getSpecialCharacterSearchValues().TEST_SPECIAL_PERIOD;
      await flow.searchExpiringLicenses(value);
      await dashboard.verifyExpiringSearchResults();
      const expected = baseline.records.filter((r) => recordMatchesValue(r, value));
      const shown = await flow.readVisibleKeys();
      for (const key of recordKeys(expected)) {
        await recordEvidence('assert-toContain-LIMAS-SUD-397-period-character-filters-records-by-visible-text.spec-24', async () => expect(shown).toContain(key));
      }
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
