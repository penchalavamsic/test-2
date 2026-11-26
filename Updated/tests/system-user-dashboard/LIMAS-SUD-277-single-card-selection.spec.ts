import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-277: should have exactly one pressed summary card after selection', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    const pressedCards = page.getByRole('button', { pressed: true });
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-277-single-card-selection.spec-12', async () => expect(pressedCards).toHaveCount(1));
  });
});