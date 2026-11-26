import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-682: section subtitle remains visible during loading', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-682-efc-section-subtitle-visible-during-loading.spec-10', async () => dashboard.floatingConfigsCard.click());

    const subtitle = page.getByText('Review and extend floating license configurations approaching expiration.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-682-efc-section-subtitle-visible-during-loading.spec-13', async () => expect(subtitle).toBeVisible());
  });
});
