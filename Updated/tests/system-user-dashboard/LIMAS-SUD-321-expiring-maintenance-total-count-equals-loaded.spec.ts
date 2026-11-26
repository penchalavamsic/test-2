import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-321: Total Count Equals Loaded Count After Maintenance Selection', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-321-expiring-maintenance-total-count-equals-loaded.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await dashboard.captureUsersResponse(() => flow.selectMaintenanceFilter());
      await flow.verifyFilterResultsUpdated();
      const total = await flow.getExpiringLicenseTotalCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-321-expiring-maintenance-total-count-equals-loaded.spec-17', async () => expect(total).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBe-LIMAS-SUD-321-expiring-maintenance-total-count-equals-loaded.spec-18', async () => expect(await flow.getExpiringLicenseLoadedCount()).toBe(total));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
