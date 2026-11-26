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
  test('LIMAS-SUD-817: empty state wording unchanged after date change', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-817-efc-d-empty-state-wording-unchanged.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const noConfigsHeading = page.getByText('No expiring floating configurations found');
    const matchCriteriaText = page.getByText('No floating license configurations match');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-817-efc-d-empty-state-wording-unchanged.spec-25', async () => expect(noConfigsHeading).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-817-efc-d-empty-state-wording-unchanged.spec-26', async () => expect(matchCriteriaText).toBeVisible());

    const today = new Date();
    const pastDate = fmtDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));

    const resp = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-817-efc-d-empty-state-wording-unchanged.spec-35', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(pastDate));
    await resp;

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-817-efc-d-empty-state-wording-unchanged.spec-38', async () => expect(noConfigsHeading).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-817-efc-d-empty-state-wording-unchanged.spec-39', async () => expect(matchCriteriaText).toBeVisible());

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-817-efc-d-empty-state-wording-unchanged.spec-42', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(''));
  });
});