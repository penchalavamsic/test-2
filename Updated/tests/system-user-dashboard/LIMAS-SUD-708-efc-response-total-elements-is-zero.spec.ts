import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-708: response totalElements is 0', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const [response] = await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-708-efc-response-total-elements-is-zero.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);
    const body = await response.json();
    await recordEvidence('assert-toBe-LIMAS-SUD-708-efc-response-total-elements-is-zero.spec-17', async () => expect(body.totalElements).toBe(0));
  });
});
