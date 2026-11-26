import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-711: zero counts displayed after empty response', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-711-efc-zero-counts-displayed-after-empty-response.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const countText = page.getByText(/0\s*loaded\s*[·•]\s*0\s*total\s*configurations/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-711-efc-zero-counts-displayed-after-empty-response.spec-18', async () => expect(countText).toBeVisible());
  });
});
