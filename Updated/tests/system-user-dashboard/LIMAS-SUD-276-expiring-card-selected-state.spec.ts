import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-276: should show [pressed] state on the Expiring Licenses card after selection', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const selectedCard = page.getByRole('button', { name: /Expiring Licenses/, pressed: true });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-276-expiring-card-selected-state.spec-12', async () => expect(selectedCard).toBeVisible());
  });
});