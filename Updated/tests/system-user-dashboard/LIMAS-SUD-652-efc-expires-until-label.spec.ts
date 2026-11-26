import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-652: expires until label is visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-652-efc-expires-until-label.spec-9', async () => dashboard.floatingConfigsCard.click());

    const label = page.getByText('Expires until');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-652-efc-expires-until-label.spec-12', async () => expect(label).toBeVisible());
  });
});
