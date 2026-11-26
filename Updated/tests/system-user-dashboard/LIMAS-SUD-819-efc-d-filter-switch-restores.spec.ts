import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-819: filter switch back to expiration restores default state', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-819-efc-d-filter-switch-restores.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcFilterGroup = page.getByRole('group', { name: 'Filter by' });
    const efcExpirationRadio = efcFilterGroup.getByRole('radio', { name: 'Expiration' });
    const efcMaintenanceRadio = efcFilterGroup.getByRole('radio', { name: 'Maintenance' });

    // Switch to Maintenance
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-819-efc-d-filter-switch-restores.spec-28', async () => efcMaintenanceRadio.click()),
    ]);

    const today = new Date();
    const futureDate = fmtDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));

    // Fill date with Maintenance active
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-fill-LIMAS-SUD-819-efc-d-filter-switch-restores.spec-38', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(futureDate)),
    ]);

    // Switch back to Expiration
    const resp = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-click-LIMAS-SUD-819-efc-d-filter-switch-restores.spec-49', async () => efcExpirationRadio.click());
    await resp;

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-819-efc-d-filter-switch-restores.spec-52', async () => expect(page.getByText(/0 loaded · 0 total configurations/)).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-819-efc-d-filter-switch-restores.spec-53', async () => expect(page.getByText('No expiring floating configurations found')).toBeVisible());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-819-efc-d-filter-switch-restores.spec-54', async () => expect(efcExpirationRadio).toBeChecked());
  });
});