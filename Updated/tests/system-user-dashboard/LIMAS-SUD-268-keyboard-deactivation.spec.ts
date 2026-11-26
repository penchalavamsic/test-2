import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-268: should deactivate history via Space key press on switch', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Enable history first so we have a checked switch to toggle from
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();
    await recordEvidence('assert-toBe-LIMAS-SUD-268-keyboard-deactivation.spec-12', async () => expect(await dashboard.isHistoryEnabled()).toBe(true));

    // Focus the switch and press Space to deactivate
    await recordEvidence('action-focus-LIMAS-SUD-268-keyboard-deactivation.spec-15', async () => dashboard.licenseHistorySwitch.focus());
    await recordEvidence('action-press-LIMAS-SUD-268-keyboard-deactivation.spec-16', async () => page.keyboard.press('Space'));
    await dashboard.waitForPendingView();

    await recordEvidence('assert-toBe-LIMAS-SUD-268-keyboard-deactivation.spec-19', async () => expect(await dashboard.isHistoryEnabled()).toBe(false));
  });
});