import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-751: Tab targets the checked radio in the group', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-751-efc-c-tab-focus-target.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcExpiresUntil = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-focus-LIMAS-SUD-751-efc-c-tab-focus-target.spec-17', async () => efcExpiresUntil.focus());
    await recordEvidence('action-press-LIMAS-SUD-751-efc-c-tab-focus-target.spec-18', async () => page.keyboard.press('Tab'));

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-751-efc-c-tab-focus-target.spec-21', async () => expect(efcExpirationRadio).toBeFocused());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-751-efc-c-tab-focus-target.spec-22', async () => expect(efcExpirationRadio).toBeChecked());
  });
});