import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-665: efc section has aria-live polite region', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-665-efc-live-region.spec-9', async () => dashboard.floatingConfigsCard.click());

    const liveRegions = page.locator('[aria-live]');
    const count = await liveRegions.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-665-efc-live-region.spec-13', async () => expect(count).toBeGreaterThanOrEqual(1));

    // At least one should be polite
    const isPolite = await liveRegions.first().getAttribute('aria-live');
    await recordEvidence('assert-toBe-LIMAS-SUD-665-efc-live-region.spec-17', async () => expect(isPolite).toBe('polite'));
  });
});
