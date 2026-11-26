import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-236: should have no [aria-live] elements in the processed records area', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Verify the processed subtitle is visible
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-236-processed-record-no-live-region.spec-12', async () => expect(dashboard.processedSectionSubtitle).toBeVisible());

    // Find all aria-live elements on the page
    const liveRegions = page.locator('[aria-live]');
    const count = await liveRegions.count();

    if (count > 0) {
      // If any exist, verify none appear below the processed subtitle
      const subtitleBox = await dashboard.processedSectionSubtitle.boundingBox();
      let hasLiveInProcessed = false;
      for (let i = 0; i < count; i++) {
        const box = await liveRegions.nth(i).boundingBox();
        if (box && subtitleBox && box.y > subtitleBox.y + subtitleBox.height) {
          hasLiveInProcessed = true;
          break;
        }
      }
      await recordEvidence('assert-toBe-LIMAS-SUD-236-processed-record-no-live-region.spec-29', async () => expect(hasLiveInProcessed).toBe(false));
    } else {
      await recordEvidence('assert-toBe-LIMAS-SUD-236-processed-record-no-live-region.spec-31', async () => expect(count).toBe(0));
    }
  });
});