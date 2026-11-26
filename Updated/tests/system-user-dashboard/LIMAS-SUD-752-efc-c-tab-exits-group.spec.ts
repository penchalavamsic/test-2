import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-752: Tab from radio group exits to next focusable element', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-752-efc-c-tab-exits-group.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Focus the checked Expiration radio and press Tab
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-focus-LIMAS-SUD-752-efc-c-tab-exits-group.spec-18', async () => efcExpirationRadio.focus());
    await recordEvidence('action-press-LIMAS-SUD-752-efc-c-tab-exits-group.spec-19', async () => page.keyboard.press('Tab'));

    // Focus should have moved away from radio group
    const isFocusedOnRadio = await efcExpirationRadio.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-LIMAS-SUD-752-efc-c-tab-exits-group.spec-23', async () => expect(isFocusedOnRadio).toBe(false));
  });
});