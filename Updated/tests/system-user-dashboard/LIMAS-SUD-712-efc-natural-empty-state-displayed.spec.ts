import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-712: natural empty state displayed after response', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-712-efc-natural-empty-state-displayed.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-712-efc-natural-empty-state-displayed.spec-17', async () => expect(page.getByText('No expiring floating configurations found')).toBeVisible());
  });
});
