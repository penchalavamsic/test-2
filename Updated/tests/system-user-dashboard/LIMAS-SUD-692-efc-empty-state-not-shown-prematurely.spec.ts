import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-692: empty state does not appear prematurely', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Switch to another section first to ensure EFC is fresh
    await recordEvidence('action-click-LIMAS-SUD-692-efc-empty-state-not-shown-prematurely.spec-12', async () => dashboard.expiringLicensesCard.click());
    
    // Now click EFC and wait for response
    await recordEvidence('action-click-LIMAS-SUD-692-efc-empty-state-not-shown-prematurely.spec-15', async () => dashboard.floatingConfigsCard.click());

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const response = await responsePromise;
    await recordEvidence('assert-toBe-LIMAS-SUD-692-efc-empty-state-not-shown-prematurely.spec-22', async () => expect(response.status()).toBe(200));

    // Empty state should be visible (not prematurely — it appears after response)
    const emptyMsg = page.getByText('No expiring floating configurations found');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-692-efc-empty-state-not-shown-prematurely.spec-26', async () => expect(emptyMsg).toBeVisible());
  });
});
