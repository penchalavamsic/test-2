import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-163: should have the history switch enabled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-163-history-switch-enabled.spec-9', async () => expect(dashboard.licenseHistorySwitch).toBeEnabled());
  });
});