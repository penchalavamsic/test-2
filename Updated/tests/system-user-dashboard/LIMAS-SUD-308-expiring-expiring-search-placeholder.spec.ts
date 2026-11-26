import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-308: should have the correct placeholder text on the expiring search input', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const placeholder = await dashboard.expiringSearchInput.getAttribute('placeholder');
    await recordEvidence('assert-toBe-LIMAS-SUD-308-expiring-expiring-search-placeholder.spec-12', async () => expect(placeholder).toBe('Search by name, email, profile, company, or Hardware ID…'));
  });
});