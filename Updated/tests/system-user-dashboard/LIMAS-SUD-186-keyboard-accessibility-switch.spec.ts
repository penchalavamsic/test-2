import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-186: should have role="switch" and be keyboard focusable', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-186-keyboard-accessibility-switch.spec-9', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('role', 'switch'));

    await recordEvidence('action-focus-LIMAS-SUD-186-keyboard-accessibility-switch.spec-11', async () => dashboard.licenseHistorySwitch.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-186-keyboard-accessibility-switch.spec-12', async () => expect(dashboard.licenseHistorySwitch).toBeFocused());
  });
});