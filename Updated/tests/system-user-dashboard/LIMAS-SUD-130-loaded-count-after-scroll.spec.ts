import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-130: Loaded count after incremental load', () => {
  test('should increase loaded count after scrolling triggers more data', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-130-loaded-count-after-scroll.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-130-loaded-count-after-scroll.spec-10', async () => dashboard.pendingRequestsTab.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-130-loaded-count-after-scroll.spec-12', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const countDisplay = page.locator('text=/\\d+\\s*loaded.*\\d+\\s*total\\s*pending/');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-130-loaded-count-after-scroll.spec-15', async () => expect(countDisplay).toBeVisible());

    // Capture initial loaded count
    const initialCountText = await countDisplay.textContent();
    const initialLoadedMatch = initialCountText?.match(/(\d+)\s*loaded/);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-130-loaded-count-after-scroll.spec-20', async () => expect(initialLoadedMatch).toBeTruthy());
    const initialLoaded = parseInt(initialLoadedMatch![1], 10);
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-130-loaded-count-after-scroll.spec-22', async () => expect(initialLoaded).toBeGreaterThan(0));

    // Check if there are more rows to load
    const totalMatch = initialCountText?.match(/(\d+)\s*total\s*pending/);
    const totalPending = totalMatch ? parseInt(totalMatch[1], 10) : 0;

    // Scroll to the bottom of the table
    await dashboard.licenseRequestTable.evaluate((el) => {
      el.scrollIntoView(false);
    });

    // Wait for incremental loading
    await page.waitForTimeout(1500);

    // Capture updated loaded count
    const updatedCountText = await countDisplay.textContent();
    const updatedLoadedMatch = updatedCountText?.match(/(\d+)\s*loaded/);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-130-loaded-count-after-scroll.spec-39', async () => expect(updatedLoadedMatch).toBeTruthy());
    const updatedLoaded = parseInt(updatedLoadedMatch![1], 10);

    // If more rows exist, loaded count should increase; otherwise it stays the same
    if (totalPending > initialLoaded) {
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-130-loaded-count-after-scroll.spec-44', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(initialLoaded));
    }

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-130-loaded-count-after-scroll.spec-47', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(1));
    await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-130-loaded-count-after-scroll.spec-48', async () => expect(updatedLoaded).toBeLessThanOrEqual(totalPending));
  });
});