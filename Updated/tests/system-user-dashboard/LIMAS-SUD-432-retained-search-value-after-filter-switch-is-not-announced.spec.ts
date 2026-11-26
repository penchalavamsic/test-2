import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-432: Retained Search Value After Filter Switch Is Not Announced', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-432-retained-search-value-after-filter-switch-is-not-announced.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_EMAIL);
      await flow.selectMaintenanceFilter();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-432-retained-search-value-after-filter-switch-is-not-announced.spec-19', async () => expect(dashboard.expiringResultCountText).toBeVisible());
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-432-retained-search-value-after-filter-switch-is-not-announced.spec-20', async () => expect(dashboard.expiringSearchInput).toHaveValue(data.TEST_USER_EMAIL));
      await recordEvidence('assert-toBe-LIMAS-SUD-432-retained-search-value-after-filter-switch-is-not-announced.spec-21', async () => expect(await dashboard.isInsideLiveRegion(dashboard.expiringResultCountText)).toBe(false));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
