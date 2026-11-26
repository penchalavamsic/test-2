import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-757: ArrowRight changes checked radio from expiration to maintenance', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-757-efc-c-arrow-changes-selection.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-757-efc-c-arrow-changes-selection.spec-18', async () => expect(efcExpirationRadio).toBeChecked());

    await recordEvidence('action-focus-LIMAS-SUD-757-efc-c-arrow-changes-selection.spec-20', async () => efcExpirationRadio.focus());
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-757-efc-c-arrow-changes-selection.spec-25', async () => page.keyboard.press('ArrowRight'));
    await maintResponse;

    await recordEvidence('assert-toBeChecked-LIMAS-SUD-757-efc-c-arrow-changes-selection.spec-28', async () => expect(efcMaintenanceRadio).toBeChecked());

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-757-efc-c-arrow-changes-selection.spec-35', async () => efcExpirationRadio.click());
    await expResponse;
  });
});