import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-260: should display dynamic pending count after disabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.disableHistory();
    await dashboard.waitForPendingView();

    // Extract the dynamic pending count text — must match loaded·total pending pattern
    const countText = page.getByText(/\d+\s*loaded[·•]\d+\s*total\s+pending/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-260-pending-count-restoration.spec-17', async () => expect(countText).toBeVisible());

    const text = await countText.textContent();
    await recordEvidence('assert-toMatch-LIMAS-SUD-260-pending-count-restoration.spec-20', async () => expect(text).toMatch(/\d+\s*loaded[·•]\d+\s*total\s+pending/i));
  });
});