import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-648: efc section subtitle is visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-648-efc-subtitle-visible.spec-9', async () => dashboard.floatingConfigsCard.click());

    const subtitle = page.getByText('Review and extend floating license configurations approaching expiration.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-648-efc-subtitle-visible.spec-12', async () => expect(subtitle).toBeVisible());
  });
});
