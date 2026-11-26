import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-645: clicking efc card sets aria-pressed true', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-645-efc-summary-card-clickable.spec-9', async () => dashboard.floatingConfigsCard.click());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-645-efc-summary-card-clickable.spec-10', async () => expect(dashboard.floatingConfigsCard).toHaveAttribute('aria-pressed', 'true'));
  });
});
