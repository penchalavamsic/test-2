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
  test('LIMAS-SUD-814: empty state visible after valid date change', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-814-efc-d-empty-state-after-date.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const today = new Date();
    const pastDate = fmtDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));

    const resp = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-814-efc-d-empty-state-after-date.spec-30', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(pastDate));
    await resp;

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-814-efc-d-empty-state-after-date.spec-33', async () => expect(page.getByText('No expiring floating configurations found')).toBeVisible());

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-814-efc-d-empty-state-after-date.spec-36', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(''));
  });
});