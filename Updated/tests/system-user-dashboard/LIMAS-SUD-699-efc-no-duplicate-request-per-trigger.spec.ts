import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-699: no duplicate GET per single trigger', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    let count = 0;
    const reqListener = (req: import('@playwright/test').Request) => {
      if (req.url().includes('/api/flconfig/e/') && req.method() === 'GET') count++;
    };
    page.on('request', reqListener);

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-699-efc-no-duplicate-request-per-trigger.spec-17', async () => dashboard.floatingConfigsCard.click()),
    ]);

    page.off('request', reqListener);
    await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-699-efc-no-duplicate-request-per-trigger.spec-24', async () => expect(count).toBeLessThanOrEqual(1)); // Should be exactly 1
  });
});
