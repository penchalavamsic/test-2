import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-662: efc empty state primary message visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-662-efc-empty-state-visible.spec-9', async () => dashboard.floatingConfigsCard.click());

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await responsePromise;

    const emptyMsg = page.getByText('No expiring floating configurations found');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-662-efc-empty-state-visible.spec-18', async () => expect(emptyMsg).toBeVisible());
  });
});
