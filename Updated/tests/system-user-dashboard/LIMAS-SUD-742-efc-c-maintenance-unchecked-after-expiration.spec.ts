import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-742: maintenance radio unchecked after expiration selected', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-742-efc-c-maintenance-unchecked-after-expiration.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Select Maintenance
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-742-efc-c-maintenance-unchecked-after-expiration.spec-22', async () => efcMaintenanceRadio.click());
    await maintResponse;

    // Now select Expiration — Maintenance should become unchecked
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-742-efc-c-maintenance-unchecked-after-expiration.spec-31', async () => efcExpirationRadio.click());
    await expResponse;

    await recordEvidence('assert-toBeChecked-LIMAS-SUD-742-efc-c-maintenance-unchecked-after-expiration.spec-34', async () => expect(efcMaintenanceRadio).not.toBeChecked());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-742-efc-c-maintenance-unchecked-after-expiration.spec-35', async () => expect(efcExpirationRadio).toBeChecked());
  });
});