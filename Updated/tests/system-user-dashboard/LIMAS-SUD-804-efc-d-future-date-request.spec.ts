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
  test('LIMAS-SUD-804: future date fill triggers exactly one flconfig request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-804-efc-d-future-date-request.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const today = new Date();
    const futureDate = fmtDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));

    let reqCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET') reqCount++;
    });

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/e/') && r.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-fill-LIMAS-SUD-804-efc-d-future-date-request.spec-36', async () => expiresUntilInput.fill(futureDate));
    await resp;

    await recordEvidence('assert-toBe-LIMAS-SUD-804-efc-d-future-date-request.spec-39', async () => expect(reqCount).toBe(1));

    await recordEvidence('action-fill-LIMAS-SUD-804-efc-d-future-date-request.spec-41', async () => expiresUntilInput.fill(''));
  });
});