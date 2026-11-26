import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-760: visual distinction between focused and selected radio states', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-760-efc-c-selection-vs-focus.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });

    // Focus the already-checked Expiration radio — should show a focus ring/outline
    await recordEvidence('action-focus-LIMAS-SUD-760-efc-c-selection-vs-focus.spec-19', async () => efcExpirationRadio.focus());
    await recordEvidence('action-keyboard-focus-efc-radio', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
    });
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-760-efc-c-selection-vs-focus.spec-20', async () => expect(efcExpirationRadio).toBeFocused());

    // Verify there is a focus indicator (outline or box-shadow)
    const hasFocusIndicator = await efcExpirationRadio.evaluate((el) => {
      const style = getComputedStyle(el);
      return (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) ||
             style.boxShadow !== 'none';
    });
    await recordEvidence('assert-toBe-LIMAS-SUD-760-efc-c-selection-vs-focus.spec-28', async () => expect(hasFocusIndicator).toBe(true));
  });
});