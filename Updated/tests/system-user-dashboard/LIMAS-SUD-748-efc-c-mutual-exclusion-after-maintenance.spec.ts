import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-748: mutual exclusion — only maintenance checked after selection', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-748-efc-c-mutual-exclusion-after-maintenance.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-748-efc-c-mutual-exclusion-after-maintenance.spec-21', async () => efcMaintenanceRadio.click());
    await maintResponse;

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-748-efc-c-mutual-exclusion-after-maintenance.spec-25', async () => expect(efcMaintenanceRadio).toBeChecked());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-748-efc-c-mutual-exclusion-after-maintenance.spec-26', async () => expect(efcExpirationRadio).not.toBeChecked());

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-748-efc-c-mutual-exclusion-after-maintenance.spec-33', async () => efcExpirationRadio.click());
    await expResponse;
  });
});