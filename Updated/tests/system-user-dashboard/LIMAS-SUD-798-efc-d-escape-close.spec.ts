import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-798: escape closes native picker and retains focus', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-798-efc-d-escape-close.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-focus-LIMAS-SUD-798-efc-d-escape-close.spec-12', async () => expiresUntilInput.focus());

    await page.evaluate(() => {
      const el = document.querySelector('#floating-expires-before') as HTMLInputElement;
      if (el && typeof el.showPicker === 'function') {
        el.showPicker();
      }
    });

    await recordEvidence('action-press-LIMAS-SUD-798-efc-d-escape-close.spec-21', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-798-efc-d-escape-close.spec-22', async () => expect(expiresUntilInput).toBeFocused());
  });
});