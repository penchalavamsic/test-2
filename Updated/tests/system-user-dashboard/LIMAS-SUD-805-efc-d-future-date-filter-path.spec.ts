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
  test('LIMAS-SUD-805: future date fill sends request to expiration filter path', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-805-efc-d-future-date-filter-path.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const today = new Date();
    const futureDate = fmtDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/e/') && r.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-fill-LIMAS-SUD-805-efc-d-future-date-filter-path.spec-31', async () => expiresUntilInput.fill(futureDate));
    const response = await resp;

    await recordEvidence('assert-toContain-LIMAS-SUD-805-efc-d-future-date-filter-path.spec-34', async () => expect(response.url()).toContain('/flconfig/e/'));

    await recordEvidence('action-fill-LIMAS-SUD-805-efc-d-future-date-filter-path.spec-36', async () => expiresUntilInput.fill(''));
  });
});