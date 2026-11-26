import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-187: should document absence of live-region announcements on history toggle', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Check that no aria-live regions announce content on toggle
    const liveRegions = page.locator('[aria-live]');
    const initialLiveCount = await liveRegions.count();

    await recordEvidence('action-click-LIMAS-SUD-187-accessibility-limitations.spec-13', async () => dashboard.licenseHistorySwitch.click());

    // The processed view should render without live-region announcements
    const processedSubtitle = page.getByText('Processed License Requests — approved or deleted.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-187-accessibility-limitations.spec-17', async () => expect(processedSubtitle).toBeVisible());

    // Assertion: no new live regions were added during the toggle
    const finalLiveCount = await liveRegions.count();
    await recordEvidence('assert-toBe-LIMAS-SUD-187-accessibility-limitations.spec-21', async () => expect(finalLiveCount).toBe(initialLiveCount));
  });
});