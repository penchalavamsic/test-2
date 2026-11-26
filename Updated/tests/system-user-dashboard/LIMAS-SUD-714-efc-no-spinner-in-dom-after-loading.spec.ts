import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-714: no spinner in DOM after loading completes', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-714-efc-no-spinner-in-dom-after-loading.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Scan for spinner elements
    const spinnerCount = await page.locator('.animate-spin').count();
    await recordEvidence('assert-toBe-LIMAS-SUD-714-efc-no-spinner-in-dom-after-loading.spec-19', async () => expect(spinnerCount).toBe(0));
  });
});
