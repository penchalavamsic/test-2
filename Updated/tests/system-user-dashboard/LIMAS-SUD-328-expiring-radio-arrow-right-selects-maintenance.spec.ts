import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-328: Arrow Right Moves Selection From Expiration To Maintenance', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-328-expiring-radio-arrow-right-selects-maintenance.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await recordEvidence('action-focus-LIMAS-SUD-328-expiring-radio-arrow-right-selects-maintenance.spec-14', async () => dashboard.expirationRadio.focus());
      await recordEvidence('action-press-LIMAS-SUD-328-expiring-radio-arrow-right-selects-maintenance.spec-15', async () => page.keyboard.press('ArrowRight'));
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-328-expiring-radio-arrow-right-selects-maintenance.spec-16', async () => expect(dashboard.maintenanceRadio).toBeChecked());
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-328-expiring-radio-arrow-right-selects-maintenance.spec-17', async () => expect(dashboard.expirationRadio).not.toBeChecked());
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
