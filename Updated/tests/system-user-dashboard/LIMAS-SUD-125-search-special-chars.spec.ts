import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-125: Search special characters', () => {
  test('should not crash or break when special characters are entered in search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-125-search-special-chars.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-125-search-special-chars.spec-10', async () => dashboard.pendingRequestsTab.click());

    const searchField = page.getByPlaceholder('Search license requests...');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-125-search-special-chars.spec-13', async () => expect(searchField).toBeVisible());

    const countDisplay = page.locator('text=/\\d+\\s*loaded.*\\d+\\s*total\\s*pending/');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-125-search-special-chars.spec-16', async () => expect(countDisplay).toBeVisible());

    // Enter a string of special characters
    const specialChars = '@#$%&*()+=[]{}\\|<>/';
    await recordEvidence('action-fill-LIMAS-SUD-125-search-special-chars.spec-20', async () => searchField.fill(specialChars));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-125-search-special-chars.spec-21', async () => expect(searchField).toHaveValue(specialChars));

    // Verify the count display is still present and valid
    await recordEvidence('assert-toPass-LIMAS-SUD-125-search-special-chars.spec-24', async () => expect(async () => {
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-125-search-special-chars.spec-25', async () => expect(countDisplay).toBeVisible());
      const text = await countDisplay.textContent();
      await recordEvidence('assert-toMatch-LIMAS-SUD-125-search-special-chars.spec-27', async () => expect(text).toMatch(/\d+\s*loaded.*\d+\s*total\s*pending/));
    }).toPass({ timeout: 10_000 }));

    // Verify the search field can be cleared
    await recordEvidence('action-clear-LIMAS-SUD-125-search-special-chars.spec-31', async () => searchField.clear());
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-125-search-special-chars.spec-32', async () => expect(searchField).toHaveValue(''));

    // Verify the full list is restored
    await recordEvidence('assert-toPass-LIMAS-SUD-125-search-special-chars.spec-35', async () => expect(async () => {
      const restoredText = await countDisplay.textContent();
      const loadedMatch = restoredText?.match(/(\d+)\s*loaded/);
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-125-search-special-chars.spec-38', async () => expect(loadedMatch).toBeTruthy());
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-125-search-special-chars.spec-39', async () => expect(parseInt(loadedMatch![1], 10)).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));
  });
});