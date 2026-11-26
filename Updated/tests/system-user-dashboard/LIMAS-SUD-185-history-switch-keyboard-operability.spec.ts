import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-185: should toggle the history switch via Space key', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-185-history-switch-keyboard-operability.spec-9', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('aria-checked', 'false'));

    await recordEvidence('action-focus-LIMAS-SUD-185-history-switch-keyboard-operability.spec-11', async () => dashboard.licenseHistorySwitch.focus());
    await recordEvidence('action-press-LIMAS-SUD-185-history-switch-keyboard-operability.spec-12', async () => page.keyboard.press('Space'));

    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-185-history-switch-keyboard-operability.spec-14', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('aria-checked', 'true'));
  });
});