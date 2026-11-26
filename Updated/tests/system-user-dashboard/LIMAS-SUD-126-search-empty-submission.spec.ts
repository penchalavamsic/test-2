import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-126: Search empty submission', () => {
  test('should not change loaded count when pressing Enter with empty search field', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-126-search-empty-submission.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-126-search-empty-submission.spec-10', async () => dashboard.pendingRequestsTab.click());

    const searchField = page.getByPlaceholder('Search license requests...');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-126-search-empty-submission.spec-13', async () => expect(searchField).toBeVisible());

    const countDisplay = page.locator('text=/\\d+\\s*loaded.*\\d+\\s*total\\s*pending/');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-126-search-empty-submission.spec-16', async () => expect(countDisplay).toBeVisible());

    // Capture initial loaded count
    const initialCountText = await countDisplay.textContent();
    const initialLoadedMatch = initialCountText?.match(/(\d+)\s*loaded/);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-126-search-empty-submission.spec-21', async () => expect(initialLoadedMatch).toBeTruthy());
    const initialLoaded = parseInt(initialLoadedMatch![1], 10);
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-126-search-empty-submission.spec-23', async () => expect(initialLoaded).toBeGreaterThan(0));

    // Ensure field is empty, focus it, and press Enter
    await recordEvidence('action-clear-LIMAS-SUD-126-search-empty-submission.spec-26', async () => searchField.clear());
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-126-search-empty-submission.spec-27', async () => expect(searchField).toHaveValue(''));
    await recordEvidence('action-focus-LIMAS-SUD-126-search-empty-submission.spec-28', async () => searchField.focus());
    await recordEvidence('action-press-LIMAS-SUD-126-search-empty-submission.spec-29', async () => page.keyboard.press('Enter'));

    // Verify the loaded count is unchanged
    await recordEvidence('assert-toPass-LIMAS-SUD-126-search-empty-submission.spec-32', async () => expect(async () => {
      const mutatedText = await countDisplay.textContent();
      const loadedMatch = mutatedText?.match(/(\d+)\s*loaded/);
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-126-search-empty-submission.spec-35', async () => expect(loadedMatch).toBeTruthy());
      const loadedCount = parseInt(loadedMatch![1], 10);
      await recordEvidence('assert-toBe-LIMAS-SUD-126-search-empty-submission.spec-37', async () => expect(loadedCount).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-126-search-empty-submission.spec-40', async () => expect(searchField).toHaveValue(''));
  });
});