import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-749: mutual exclusion — only expiration checked after return', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-749-efc-c-mutual-exclusion-after-expiration.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Select Maintenance
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-749-efc-c-mutual-exclusion-after-expiration.spec-22', async () => efcMaintenanceRadio.click());
    await maintResponse;

    // Return to Expiration
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-749-efc-c-mutual-exclusion-after-expiration.spec-31', async () => efcExpirationRadio.click());
    await expResponse;

    await recordEvidence('assert-toBeChecked-LIMAS-SUD-749-efc-c-mutual-exclusion-after-expiration.spec-34', async () => expect(efcExpirationRadio).toBeChecked());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-749-efc-c-mutual-exclusion-after-expiration.spec-35', async () => expect(efcMaintenanceRadio).not.toBeChecked());
  });
});