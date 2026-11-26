import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-693: empty state restored after successful empty response', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-693-efc-empty-state-restored-after-empty-response.spec-10', async () => dashboard.floatingConfigsCard.click());

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await responsePromise;

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-693-efc-empty-state-restored-after-empty-response.spec-18', async () => expect(page.getByText('No expiring floating configurations found')).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-693-efc-empty-state-restored-after-empty-response.spec-19', async () => expect(page.getByText('No floating license configurations match the selected date criteria.')).toBeVisible());
  });
});
