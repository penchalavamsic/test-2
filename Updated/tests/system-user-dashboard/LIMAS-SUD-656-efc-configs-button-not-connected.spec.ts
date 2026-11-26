import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-656: floating configs button shows not-yet-connected toast', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-656-efc-configs-button-not-connected.spec-9', async () => dashboard.floatingConfigsCard.click());

    const btn = page.getByRole('button', { name: 'Floating License Configurations' });
    await recordEvidence('action-click-LIMAS-SUD-656-efc-configs-button-not-connected.spec-12', async () => btn.click());

    // Toast should appear with "Not yet connected"
    const toast = page.locator('[data-sonner-toaster] li, [role="status"]').filter({
      hasText: /Not yet connected/i
    }).first();
    await toast.waitFor({ state: 'visible', timeout: 5000 });

    // Verify page did not navigate away
    await recordEvidence('assert-toHaveURL-LIMAS-SUD-656-efc-configs-button-not-connected.spec-21', async () => expect(page).toHaveURL(/\/system-user-dashboard/));
  });
});
