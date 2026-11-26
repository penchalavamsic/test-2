import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-795: expires until input is reachable via tab order', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-795-efc-d-tab-order.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expirationRadio = page.getByRole('radio', { name: 'Expiration', exact: true });
    await recordEvidence('action-focus-LIMAS-SUD-795-efc-d-tab-order.spec-12', async () => expirationRadio.focus());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-press-LIMAS-SUD-795-efc-d-tab-order.spec-15', async () => expirationRadio.press('Tab'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-795-efc-d-tab-order.spec-16', async () => expect(expiresUntilInput).toBeFocused());
  });
});