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
  test('LIMAS-SUD-811: date value persists after response', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-811-efc-d-value-persisted.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const today = new Date();
    const pastDate = fmtDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-fill-LIMAS-SUD-811-efc-d-value-persisted.spec-31', async () => expiresUntilInput.fill(pastDate));
    await resp;

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-811-efc-d-value-persisted.spec-34', async () => expect(expiresUntilInput).toHaveValue(pastDate));

    await recordEvidence('action-fill-LIMAS-SUD-811-efc-d-value-persisted.spec-36', async () => expiresUntilInput.fill(''));
  });
});