import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-750: Tab from expires-until reaches the radio group', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-750-efc-c-tab-reaches-group.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Focus the Expires until input, then Tab
    const efcExpiresUntil = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-focus-LIMAS-SUD-750-efc-c-tab-reaches-group.spec-18', async () => efcExpiresUntil.focus());
    await recordEvidence('action-press-LIMAS-SUD-750-efc-c-tab-reaches-group.spec-19', async () => page.keyboard.press('Tab'));

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-750-efc-c-tab-reaches-group.spec-22', async () => expect(efcExpirationRadio).toBeFocused());
  });
});