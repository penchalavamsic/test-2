import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Large Result Set', () => {
  test('LIMAS-SUD-437: Total Count Is Stable After Reselecting Expiration', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-437-total-count-stable-on-reselect.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      const before = await dashboard.getExpiringLicenseTotalCount();
      await flow.selectMaintenanceFilter();
      await dashboard.verifyFilterResultsUpdated();
      await flow.selectExpirationFilter();
      await dashboard.verifyFilterResultsUpdated();
      await recordEvidence('assert-toBe-LIMAS-SUD-437-total-count-stable-on-reselect.spec-20', async () => expect(await dashboard.getExpiringLicenseTotalCount()).toBe(before));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
