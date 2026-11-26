import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-254: should maintain session stability after incremental load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.triggerSingleIncrementalLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-254-incremental-session-stability.spec-13', async () => expect(dashboard.heading).toBeVisible());
    const currentUrl = page.url();
    await recordEvidence('assert-toContain-LIMAS-SUD-254-incremental-session-stability.spec-15', async () => expect(currentUrl).toContain('/system-user-dashboard'));
  });
});