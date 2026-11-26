import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-421: Switching Filter Recalculates Total Count', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-421-switching-filter-recalculates-total-count.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_EMAIL);
      await flow.selectMaintenanceFilter();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-421-switching-filter-recalculates-total-count.spec-19', async () => expect(dashboard.expiringResultCountText).toBeVisible());
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-421-switching-filter-recalculates-total-count.spec-20', async () => expect(await dashboard.getExpiringResultTotal()).toBeGreaterThanOrEqual(0));
      await flow.selectExpirationFilter();
      await recordEvidence('assert-toBe-LIMAS-SUD-421-switching-filter-recalculates-total-count.spec-22', async () => expect.poll(async () => dashboard.getExpiringResultTotal()).toBe(baseline.total));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
