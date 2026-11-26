import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-771: no duplicate section heading after filter switch', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-771-efc-c-transition-no-duplicate-shell.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-771-efc-c-transition-no-duplicate-shell.spec-21', async () => efcMaintenanceRadio.click());
    await maintResponse;

    const efcHeading = page.getByRole('heading', { name: 'Expiring Floating Configurations', level: 3 });
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-771-efc-c-transition-no-duplicate-shell.spec-25', async () => expect(efcHeading).toHaveCount(1));

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-771-efc-c-transition-no-duplicate-shell.spec-33', async () => efcExpirationRadio.click());
    await expResponse;
  });
});