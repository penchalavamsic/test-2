import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-361: Filter Result Updates Are Not In A Live Region', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-361-expiring-a11y-filter-results-not-in-live-region.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await dashboard.captureUsersResponse(() => flow.selectMaintenanceFilter());
      await flow.verifyFilterResultsUpdated();
      await recordEvidence('assert-toBe-LIMAS-SUD-361-expiring-a11y-filter-results-not-in-live-region.spec-16', async () => expect(await dashboard.isInsideLiveRegion(dashboard.extendButtons.first())).toBe(false));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
