import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { recordMatchesValue, getSpecialCharacterSearchValues } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-398: Apostrophe Character Is Accepted Safely', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-398-apostrophe-character-is-accepted-safely.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      const value = getSpecialCharacterSearchValues().TEST_SPECIAL_APOSTROPHE;
      await flow.searchExpiringLicenses(value);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-398-apostrophe-character-is-accepted-safely.spec-20', async () => expect(dashboard.expiringResultCountText).toBeVisible());
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-398-apostrophe-character-is-accepted-safely.spec-21', async () => expect(dashboard.heading).toBeVisible());
      await recordEvidence('assert-toBe-LIMAS-SUD-398-apostrophe-character-is-accepted-safely.spec-22', async () => expect(await dashboard.extendButtons.count()).toBe(baseline.records.filter((r) => recordMatchesValue(r, value)).length));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
