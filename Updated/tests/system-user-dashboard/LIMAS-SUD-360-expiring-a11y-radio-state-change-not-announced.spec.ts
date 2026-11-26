import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-360: Radio State Changes Are Not In A Live Region', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-360-expiring-a11y-radio-state-change-not-announced.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await recordEvidence('assert-toBe-LIMAS-SUD-360-expiring-a11y-radio-state-change-not-announced.spec-15', async () => expect(await dashboard.isInsideLiveRegion(dashboard.expiringFilterGroup)).toBe(false));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
