import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-317: Selecting Maintenance Refreshes License List Through API', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-317-expiring-maintenance-list-request-issued.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      const response = await dashboard.captureUsersResponse(() => flow.selectMaintenanceFilter());
      await recordEvidence('assert-toBe-LIMAS-SUD-317-expiring-maintenance-list-request-issued.spec-15', async () => expect(response.status).toBe(200));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
