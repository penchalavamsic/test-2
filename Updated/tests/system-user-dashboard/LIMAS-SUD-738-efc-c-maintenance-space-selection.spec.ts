import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-738: Space selects maintenance radio and triggers request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-738-efc-c-maintenance-space-selection.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('action-focus-LIMAS-SUD-738-efc-c-maintenance-space-selection.spec-17', async () => efcMaintenanceRadio.focus());

    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-738-efc-c-maintenance-space-selection.spec-23', async () => page.keyboard.press('Space'));
    await maintResponse;
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-738-efc-c-maintenance-space-selection.spec-25', async () => expect(efcMaintenanceRadio).toBeChecked());

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-focus-LIMAS-SUD-738-efc-c-maintenance-space-selection.spec-33', async () => efcExpirationRadio.focus());
    await recordEvidence('action-press-LIMAS-SUD-738-efc-c-maintenance-space-selection.spec-34', async () => page.keyboard.press('Space'));
    await expResponse;
  });
});