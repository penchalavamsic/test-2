import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-755: ArrowDown changes selection within radio group', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-755-efc-c-arrow-down-navigation.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('action-focus-LIMAS-SUD-755-efc-c-arrow-down-navigation.spec-18', async () => efcExpirationRadio.focus());

    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-755-efc-c-arrow-down-navigation.spec-24', async () => page.keyboard.press('ArrowDown'));
    await maintResponse;

    await recordEvidence('assert-toBeChecked-LIMAS-SUD-755-efc-c-arrow-down-navigation.spec-27', async () => expect(efcMaintenanceRadio).toBeChecked());

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-755-efc-c-arrow-down-navigation.spec-34', async () => efcExpirationRadio.click());
    await expResponse;
  });
});