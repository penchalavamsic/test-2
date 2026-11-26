import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-791: expires until input has no aria-required attribute', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-791-efc-d-no-aria-required.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    const ariaReq = await expiresUntilInput.getAttribute('aria-required');
    await recordEvidence('assert-toBeNull-LIMAS-SUD-791-efc-d-no-aria-required.spec-13', async () => expect(ariaReq).toBeNull());
  });
});