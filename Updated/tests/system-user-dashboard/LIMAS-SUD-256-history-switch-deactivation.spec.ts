import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-256: should toggle isHistoryEnabled from true to false on deactivation', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Ensure history is enabled first
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();
    await recordEvidence('assert-toBe-LIMAS-SUD-256-history-switch-deactivation.spec-12', async () => expect(await dashboard.isHistoryEnabled()).toBe(true));

    // Deactivate
    await dashboard.disableHistory();
    await recordEvidence('assert-toBe-LIMAS-SUD-256-history-switch-deactivation.spec-16', async () => expect(await dashboard.isHistoryEnabled()).toBe(false));
  });
});