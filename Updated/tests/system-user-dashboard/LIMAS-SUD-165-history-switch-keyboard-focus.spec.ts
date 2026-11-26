import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-165: should be focusable via keyboard Tab', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-focus-LIMAS-SUD-165-history-switch-keyboard-focus.spec-9', async () => dashboard.licenseHistorySwitch.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-165-history-switch-keyboard-focus.spec-10', async () => expect(dashboard.licenseHistorySwitch).toBeFocused());
  });
});