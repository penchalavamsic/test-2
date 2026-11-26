import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-654: expires until input is initially empty', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-654-efc-expires-until-initially-empty.spec-9', async () => dashboard.floatingConfigsCard.click());

    const input = page.locator('#floating-expires-before');
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-654-efc-expires-until-initially-empty.spec-12', async () => expect(input).toHaveValue(''));
  });
});
