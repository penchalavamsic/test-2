import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { recordKeys, getWhitespaceSearchValues } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-392: Spaces-Only Value Shows Full List', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-392-spaces-only-value-shows-full-list.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      const spaces = getWhitespaceSearchValues(data.TEST_USER_NAME).TEST_SPACES_ONLY_VALUE;
      await flow.searchExpiringLicenses(spaces);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-392-spaces-only-value-shows-full-list.spec-20', async () => expect(dashboard.expiringCountText).toBeVisible());
      await flow.verifyVisibleRecordKeys(recordKeys(baseline.records));
      await recordEvidence('assert-toBe-LIMAS-SUD-392-spaces-only-value-shows-full-list.spec-22', async () => expect(await dashboard.getExpiringResultCount()).toBe(baseline.loaded));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
