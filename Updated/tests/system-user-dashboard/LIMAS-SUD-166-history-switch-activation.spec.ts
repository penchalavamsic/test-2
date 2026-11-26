import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-166: should change aria-checked on click activation', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-166-history-switch-activation.spec-9', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('aria-checked', 'false'));

    await recordEvidence('action-click-LIMAS-SUD-166-history-switch-activation.spec-11', async () => dashboard.licenseHistorySwitch.click());

    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-166-history-switch-activation.spec-13', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('aria-checked', 'true'));
  });
});