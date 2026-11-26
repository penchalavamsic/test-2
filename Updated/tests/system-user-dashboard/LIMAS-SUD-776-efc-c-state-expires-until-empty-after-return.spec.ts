import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-776: expires-until input is empty after returning to expiration', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-776-efc-c-state-expires-until-empty-after-return.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Switch to Maintenance
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-776-efc-c-state-expires-until-empty-after-return.spec-22', async () => efcMaintenanceRadio.click());
    await maintResponse;

    // Switch back to Expiration
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-776-efc-c-state-expires-until-empty-after-return.spec-31', async () => efcExpirationRadio.click());
    await expResponse;

    const efcExpiresUntil = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-776-efc-c-state-expires-until-empty-after-return.spec-35', async () => expect(efcExpiresUntil).toHaveValue(''));
  });
});