import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-694: exactly one empty-state container in DOM', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-694-efc-no-duplicate-empty-state-render.spec-10', async () => dashboard.floatingConfigsCard.click());

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await responsePromise;

    const emptyHeadings = page.getByText('No expiring floating configurations found');
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-694-efc-no-duplicate-empty-state-render.spec-19', async () => expect(emptyHeadings).toHaveCount(1));
  });
});
