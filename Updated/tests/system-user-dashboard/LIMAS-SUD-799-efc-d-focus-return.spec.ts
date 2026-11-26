import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-799: focus returns to input after picker closed via escape', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-799-efc-d-focus-return.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-focus-LIMAS-SUD-799-efc-d-focus-return.spec-12', async () => expiresUntilInput.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-799-efc-d-focus-return.spec-13', async () => expect(expiresUntilInput).toBeFocused());

    await page.evaluate(() => {
      const el = document.querySelector('#floating-expires-before') as HTMLInputElement;
      if (el && typeof el.showPicker === 'function') {
        el.showPicker();
      }
    });

    await recordEvidence('action-press-LIMAS-SUD-799-efc-d-focus-return.spec-22', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-799-efc-d-focus-return.spec-23', async () => expect(expiresUntilInput).toBeFocused());
  });
});