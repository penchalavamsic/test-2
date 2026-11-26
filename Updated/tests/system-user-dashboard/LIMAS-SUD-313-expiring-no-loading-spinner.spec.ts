import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-313: should have no loading spinner present after initial load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const spinnerCount = await page.locator('[role="progressbar"]').count();
    await recordEvidence('assert-toBe-LIMAS-SUD-313-expiring-no-loading-spinner.spec-12', async () => expect(spinnerCount).toBe(0));
  });
});