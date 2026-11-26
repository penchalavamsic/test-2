import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-172: should show loaded record count after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-172-loaded-record-count-visibility.spec-9', async () => dashboard.licenseHistorySwitch.click());

    const countText = page.getByText(/\d+\s*loaded[·•]\d+\s*total\s+processed/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-172-loaded-record-count-visibility.spec-12', async () => expect(countText).toBeVisible());
  });
});