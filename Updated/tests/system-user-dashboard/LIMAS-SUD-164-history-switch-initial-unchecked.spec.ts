import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-164: should have the history switch initially unchecked', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-164-history-switch-initial-unchecked.spec-9', async () => expect(dashboard.licenseHistorySwitch).toHaveAttribute('aria-checked', 'false'));
  });
});