import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-657: floating configs toast auto-dismisses', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-657-efc-configs-button-dismiss.spec-9', async () => dashboard.floatingConfigsCard.click());

    const btn = page.getByRole('button', { name: 'Floating License Configurations' });
    await recordEvidence('action-click-LIMAS-SUD-657-efc-configs-button-dismiss.spec-12', async () => btn.click());

    const toast = page.locator('[data-sonner-toaster] li, [role="status"]').filter({
      hasText: /Not yet connected/i
    }).first();
    await toast.waitFor({ state: 'visible', timeout: 5000 });
    await toast.waitFor({ state: 'hidden', timeout: 10000 });
  });
});
