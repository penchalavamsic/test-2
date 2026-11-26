import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-642: efc summary card has role button and aria-pressed', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-642-efc-summary-card-role.spec-9', async () => expect(dashboard.floatingConfigsCard).toHaveRole('button'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-642-efc-summary-card-role.spec-10', async () => expect(dashboard.floatingConfigsCard).toHaveAttribute('aria-pressed'));
  });
});
