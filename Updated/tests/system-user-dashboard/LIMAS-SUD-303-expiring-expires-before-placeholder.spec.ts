import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-303: should have an empty "Expires before" input (no preset date)', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const value = await dashboard.expiresBeforeInput.inputValue();
    await recordEvidence('assert-toBe-LIMAS-SUD-303-expiring-expires-before-placeholder.spec-12', async () => expect(value).toBe(''));
  });
});