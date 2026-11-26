import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-753: ArrowRight navigates from expiration to maintenance', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-753-efc-c-arrow-right-navigation.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('action-focus-LIMAS-SUD-753-efc-c-arrow-right-navigation.spec-18', async () => efcExpirationRadio.focus());

    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-753-efc-c-arrow-right-navigation.spec-24', async () => page.keyboard.press('ArrowRight'));
    await maintResponse;

    await recordEvidence('assert-toBeChecked-LIMAS-SUD-753-efc-c-arrow-right-navigation.spec-27', async () => expect(efcMaintenanceRadio).toBeChecked());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-753-efc-c-arrow-right-navigation.spec-28', async () => expect(efcExpirationRadio).not.toBeChecked());

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-753-efc-c-arrow-right-navigation.spec-35', async () => efcExpirationRadio.click());
    await expResponse;
  });
});