import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-322: Switching Filter Modes Keeps Session Authenticated', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-322-expiring-filter-switch-session-stable.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await flow.selectExpirationFilter();
      await recordEvidence('assert-toHaveURL-LIMAS-SUD-322-expiring-filter-switch-session-stable.spec-16', async () => expect(page).toHaveURL(/\/system-user-dashboard/));
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-322-expiring-filter-switch-session-stable.spec-17', async () => expect(dashboard.heading).toBeVisible());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
