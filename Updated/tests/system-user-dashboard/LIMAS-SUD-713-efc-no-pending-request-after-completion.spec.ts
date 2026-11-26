import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-713: no pending flconfig request after completion', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const [response] = await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-713-efc-no-pending-request-after-completion.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);
    await recordEvidence('assert-toBe-LIMAS-SUD-713-efc-no-pending-request-after-completion.spec-16', async () => expect(response.status()).toBe(200));
    // Response completed — no pending request
  });
});
