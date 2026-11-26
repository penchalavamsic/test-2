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
  test('LIMAS-SUD-809: maintenance filter date fill uses /flconfig/m/ path', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-809-efc-d-maintenance-date-path.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/m/') && r.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-809-efc-d-maintenance-date-path.spec-28', async () => efcMaintenanceRadio.click());
    await maintResp;

    const today = new Date();
    const futureDate = fmtDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    const dateResp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/m/') && r.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-fill-LIMAS-SUD-809-efc-d-maintenance-date-path.spec-39', async () => expiresUntilInput.fill(futureDate));
    const response = await dateResp;

    await recordEvidence('assert-toContain-LIMAS-SUD-809-efc-d-maintenance-date-path.spec-42', async () => expect(response.url()).toContain('/flconfig/m/'));

    await recordEvidence('action-fill-LIMAS-SUD-809-efc-d-maintenance-date-path.spec-44', async () => expiresUntilInput.fill(''));
    const expResp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/e/') && r.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-809-efc-d-maintenance-date-path.spec-50', async () => efcExpirationRadio.click());
    await expResp;
  });
});