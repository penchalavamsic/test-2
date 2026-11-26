import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-655: floating license configurations button is visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-655-efc-configs-button-visible.spec-9', async () => dashboard.floatingConfigsCard.click());

    const btn = page.getByRole('button', { name: 'Floating License Configurations' });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-655-efc-configs-button-visible.spec-12', async () => expect(btn).toBeVisible());
  });
});
