import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-661: efc count text shows zero loaded and zero total', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-661-efc-count-text-zero.spec-9', async () => dashboard.floatingConfigsCard.click());

    // Wait for the flconfig API response
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await responsePromise;

    const countText = page.getByText(/0\s*loaded\s*[·•]\s*0\s*total\s*configurations/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-661-efc-count-text-zero.spec-19', async () => expect(countText).toBeVisible());
  });
});
