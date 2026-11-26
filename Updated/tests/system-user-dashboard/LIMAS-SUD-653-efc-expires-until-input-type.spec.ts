import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-653: expires until input is type=date with correct id', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-653-efc-expires-until-input-type.spec-9', async () => dashboard.floatingConfigsCard.click());

    const input = page.locator('#floating-expires-before');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-653-efc-expires-until-input-type.spec-12', async () => expect(input).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-653-efc-expires-until-input-type.spec-13', async () => expect(input).toHaveAttribute('type', 'date'));
  });
});
