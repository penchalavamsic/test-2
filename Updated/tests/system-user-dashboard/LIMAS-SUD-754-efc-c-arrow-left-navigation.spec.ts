import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-754: ArrowLeft navigates from maintenance to expiration', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-754-efc-c-arrow-left-navigation.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // First navigate to Maintenance via ArrowRight
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-focus-LIMAS-SUD-754-efc-c-arrow-left-navigation.spec-18', async () => efcExpirationRadio.focus());

    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-754-efc-c-arrow-left-navigation.spec-24', async () => page.keyboard.press('ArrowRight'));
    await maintResponse;

    // Now ArrowLeft back to Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-754-efc-c-arrow-left-navigation.spec-32', async () => page.keyboard.press('ArrowLeft'));
    await expResponse;

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-754-efc-c-arrow-left-navigation.spec-36', async () => expect(efcExpirationRadio).toBeChecked());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-754-efc-c-arrow-left-navigation.spec-37', async () => expect(efcMaintenanceRadio).not.toBeChecked());
  });
});