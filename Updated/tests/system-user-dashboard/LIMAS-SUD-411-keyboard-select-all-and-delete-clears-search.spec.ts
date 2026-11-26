import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { recordKeys } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-411: Keyboard Select-All And Delete Clears Search', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-411-keyboard-select-all-and-delete-clears-search.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      await dashboard.verifyExpiringSearchResults();
      await recordEvidence('action-press-LIMAS-SUD-411-keyboard-select-all-and-delete-clears-search.spec-20', async () => dashboard.expiringSearchInput.press('ControlOrMeta+A'));
      await recordEvidence('action-press-LIMAS-SUD-411-keyboard-select-all-and-delete-clears-search.spec-21', async () => dashboard.expiringSearchInput.press('Delete'));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-411-keyboard-select-all-and-delete-clears-search.spec-22', async () => expect(dashboard.expiringSearchInput).toHaveValue(''));
      await flow.verifyVisibleRecordKeys(recordKeys(baseline.records));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
