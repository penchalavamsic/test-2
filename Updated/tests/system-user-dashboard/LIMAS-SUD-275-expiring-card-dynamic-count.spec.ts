import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-275: should display a numeric count in the Expiring Licenses card text', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const cardText = await dashboard.expiringLicensesCard.textContent();
    await recordEvidence('assert-toMatch-LIMAS-SUD-275-expiring-card-dynamic-count.spec-10', async () => expect(cardText).toMatch(/\d+/));
  });
});