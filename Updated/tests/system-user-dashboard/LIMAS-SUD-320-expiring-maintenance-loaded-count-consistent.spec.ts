import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-320: Loaded Count Matches Rendered Records After Maintenance Selection', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-320-expiring-maintenance-loaded-count-consistent.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await dashboard.captureUsersResponse(() => flow.selectMaintenanceFilter());
      await flow.verifyFilterResultsUpdated();
      const loaded = await flow.getExpiringLicenseLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-320-expiring-maintenance-loaded-count-consistent.spec-17', async () => expect(loaded).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-320-expiring-maintenance-loaded-count-consistent.spec-18', async () => expect(dashboard.extendButtons).toHaveCount(loaded));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
