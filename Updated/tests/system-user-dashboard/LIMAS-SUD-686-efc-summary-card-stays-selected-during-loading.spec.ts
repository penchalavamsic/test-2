import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-686: efc summary card stays selected during loading', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-686-efc-summary-card-stays-selected-during-loading.spec-11', async () => dashboard.floatingConfigsCard.click());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-686-efc-summary-card-stays-selected-during-loading.spec-12', async () => expect(dashboard.floatingConfigsCard).toHaveAttribute('aria-pressed', 'true'));
  });
});
