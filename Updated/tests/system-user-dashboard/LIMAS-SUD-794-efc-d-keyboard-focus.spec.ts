import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-794: expires until input receives keyboard focus', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-794-efc-d-keyboard-focus.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-focus-LIMAS-SUD-794-efc-d-keyboard-focus.spec-12', async () => expiresUntilInput.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-794-efc-d-keyboard-focus.spec-13', async () => expect(expiresUntilInput).toBeFocused());
  });
});