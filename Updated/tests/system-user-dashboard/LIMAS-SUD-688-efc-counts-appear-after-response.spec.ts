import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-688: zero counts displayed after successful empty response', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-688-efc-counts-appear-after-response.spec-10', async () => dashboard.floatingConfigsCard.click());

    // Wait for flconfig API response
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await responsePromise;

    const countText = page.getByText(/0\s*loaded\s*[·•]\s*0\s*total\s*configurations/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-688-efc-counts-appear-after-response.spec-20', async () => expect(countText).toBeVisible());
  });
});
