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
  test('LIMAS-SUD-807: filling same date twice does not trigger duplicate request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-807-efc-d-same-date-no-duplicate.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const today = new Date();
    const pastDate = fmtDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp1 = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-fill-LIMAS-SUD-807-efc-d-same-date-no-duplicate.spec-31', async () => expiresUntilInput.fill(pastDate));
    await resp1;

    let newCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET') newCount++;
    });
    const [noReq] = await Promise.all([
      page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 2000 }
    ).then(() => false).catch(() => true),
      recordEvidence('action-fill-LIMAS-SUD-807-efc-d-same-date-no-duplicate.spec-38', async () => expiresUntilInput.fill(pastDate)),
    ]);
    await recordEvidence('assert-toBe-LIMAS-SUD-807-efc-d-same-date-no-duplicate.spec-44', async () => expect(noReq).toBe(true));
    await recordEvidence('assert-toBe-LIMAS-SUD-807-efc-d-same-date-no-duplicate.spec-45', async () => expect(newCount).toBe(0));

    await recordEvidence('action-fill-LIMAS-SUD-807-efc-d-same-date-no-duplicate.spec-47', async () => expiresUntilInput.fill(''));
  });
});