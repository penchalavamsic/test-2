import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-318: Selecting Maintenance Requests A Page With Page Size', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-318-expiring-maintenance-request-page-size-parameters.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      const response = await dashboard.captureUsersResponse(() => flow.selectMaintenanceFilter());
      await recordEvidence('assert-toBe-LIMAS-SUD-318-expiring-maintenance-request-page-size-parameters.spec-15', async () => expect(response.status).toBe(200));
      await recordEvidence('assert-toMatch-LIMAS-SUD-318-expiring-maintenance-request-page-size-parameters.spec-16', async () => expect(response.url.searchParams.get('page')).toMatch(/^\d+$/));
      await recordEvidence('assert-toMatch-LIMAS-SUD-318-expiring-maintenance-request-page-size-parameters.spec-17', async () => expect(response.url.searchParams.get('size')).toMatch(/^\d+$/));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
