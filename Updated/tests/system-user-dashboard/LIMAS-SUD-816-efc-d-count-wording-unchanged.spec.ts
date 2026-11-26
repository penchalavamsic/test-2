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
  test('LIMAS-SUD-816: count text wording unchanged after date change', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-816-efc-d-count-wording-unchanged.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const countText = page.getByText(/0 loaded · 0 total configurations/);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-816-efc-d-count-wording-unchanged.spec-24', async () => expect(countText).toBeVisible());
    const countBefore = await countText.textContent();

    const today = new Date();
    const pastDate = fmtDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));

    const resp = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-816-efc-d-count-wording-unchanged.spec-34', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(pastDate));
    await resp;

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-816-efc-d-count-wording-unchanged.spec-37', async () => expect(countText).toBeVisible());
    const countAfter = await countText.textContent();
    // Count wording should structurally match (loaded/total pattern)
    await recordEvidence('assert-toMatch-LIMAS-SUD-816-efc-d-count-wording-unchanged.spec-40', async () => expect(countAfter).toMatch(/^\s*\d+\s*loaded · \d+\s*total\s+configurations\s*$/));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-816-efc-d-count-wording-unchanged.spec-43', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(''));
  });
});