import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-274: should have the Expiring Licenses summary card enabled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-274-expiring-card-enabled.spec-9', async () => expect(dashboard.expiringLicensesCard).toBeEnabled());
  });
});