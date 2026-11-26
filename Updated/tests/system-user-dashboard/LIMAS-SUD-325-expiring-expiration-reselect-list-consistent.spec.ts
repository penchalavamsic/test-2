import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-325: Reselecting Expiration Keeps Loaded Count And Records Consistent', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-325-expiring-expiration-reselect-list-consistent.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await flow.selectExpirationFilter();
      await flow.verifyFilterResultsUpdated();
      const loaded = await flow.getExpiringLicenseLoadedCount();
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-325-expiring-expiration-reselect-list-consistent.spec-18', async () => expect(dashboard.extendButtons).toHaveCount(loaded));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
