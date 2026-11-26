import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-167: should have aria-checked="true" after activation', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-167-history-switch-checked-state.spec-9', async () => dashboard.licenseHistorySwitch.click());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-167-history-switch-checked-state.spec-10', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('aria-checked', 'true'));
  });
});