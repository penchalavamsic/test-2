import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-700: no data-changing request sent during EFC loading', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const forbiddenMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
    let violation: string | null = null;

    const reqListener = (req: import('@playwright/test').Request) => {
      if (forbiddenMethods.has(req.method())) {
        violation = req.method() + ' ' + req.url();
      }
    };
    page.on('request', reqListener);

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-700-efc-no-update-request-sent.spec-21', async () => dashboard.floatingConfigsCard.click()),
    ]);

    page.off('request', reqListener);
    await recordEvidence('assert-toBeNull-LIMAS-SUD-700-efc-no-update-request-sent.spec-28', async () => expect(violation).toBeNull());
  });
});
