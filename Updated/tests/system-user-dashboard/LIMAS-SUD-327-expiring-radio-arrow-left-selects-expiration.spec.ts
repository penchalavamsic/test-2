import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-327: Arrow Left Moves Selection From Maintenance To Expiration', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-327-expiring-radio-arrow-left-selects-expiration.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await recordEvidence('action-focus-LIMAS-SUD-327-expiring-radio-arrow-left-selects-expiration.spec-15', async () => dashboard.maintenanceRadio.focus());
      await recordEvidence('action-press-LIMAS-SUD-327-expiring-radio-arrow-left-selects-expiration.spec-16', async () => page.keyboard.press('ArrowLeft'));
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-327-expiring-radio-arrow-left-selects-expiration.spec-17', async () => expect(dashboard.expirationRadio).toBeChecked());
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-327-expiring-radio-arrow-left-selects-expiration.spec-18', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
