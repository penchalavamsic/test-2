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
  test('LIMAS-SUD-818: clearing date restores default zero-data state', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-818-efc-d-clear-restores-default.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const today = new Date();
    const pastDate = fmtDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));

    // Set a date
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-fill-LIMAS-SUD-818-efc-d-clear-restores-default.spec-27', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(pastDate)),
    ]);

    // Clear it
    const resp = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-818-efc-d-clear-restores-default.spec-38', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(''));
    await resp;

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-818-efc-d-clear-restores-default.spec-41', async () => expect(page.getByText(/0 loaded · 0 total configurations/)).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-818-efc-d-clear-restores-default.spec-42', async () => expect(page.getByText('No expiring floating configurations found')).toBeVisible());
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-818-efc-d-clear-restores-default.spec-43', async () => expect(page.getByRole('textbox', { name: 'Expires until' })).toHaveValue(''));
  });
});