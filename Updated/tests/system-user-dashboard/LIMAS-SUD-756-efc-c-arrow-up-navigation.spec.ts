import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-756: ArrowUp changes selection within radio group', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-756-efc-c-arrow-up-navigation.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Navigate to Maintenance first
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-focus-LIMAS-SUD-756-efc-c-arrow-up-navigation.spec-18', async () => efcExpirationRadio.focus());

    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-756-efc-c-arrow-up-navigation.spec-24', async () => page.keyboard.press('ArrowRight'));
    await maintResponse;

    // ArrowUp back to Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-756-efc-c-arrow-up-navigation.spec-32', async () => page.keyboard.press('ArrowUp'));
    await expResponse;

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-756-efc-c-arrow-up-navigation.spec-36', async () => expect(efcExpirationRadio).toBeChecked());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-756-efc-c-arrow-up-navigation.spec-37', async () => expect(efcMaintenanceRadio).not.toBeChecked());
  });
});