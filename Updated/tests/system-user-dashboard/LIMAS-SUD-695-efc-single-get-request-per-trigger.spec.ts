import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-695: exactly one GET request per EFC card click', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Switch away from EFC to force a fresh request on re-entry
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/users/f') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ).catch(() => {}),
      recordEvidence('action-click-LIMAS-SUD-695-efc-single-get-request-per-trigger.spec-12', async () => dashboard.expiringLicensesCard.click()),
    ]); // May already be cached

    // Track flconfig requests
    let requestCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/e/') && req.method() === 'GET') {
        requestCount++;
      }
    });

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-695-efc-single-get-request-per-trigger.spec-27', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Should be exactly 1 new request
    await recordEvidence('assert-toBe-LIMAS-SUD-695-efc-single-get-request-per-trigger.spec-36', async () => expect(requestCount).toBe(1));
  });
});
