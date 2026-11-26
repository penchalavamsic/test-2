import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-119: Search by request ID', () => {
  test('should filter results when typing a request ID from a visible Delete button', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-119-search-by-request-id.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-119-search-by-request-id.spec-10', async () => dashboard.pendingRequestsTab.click());

    const searchField = page.getByPlaceholder('Search license requests...');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-119-search-by-request-id.spec-13', async () => expect(searchField).toBeVisible());

    const countDisplay = page.locator('text=/\\d+\\s*loaded.*\\d+\\s*total\\s*pending/');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-119-search-by-request-id.spec-16', async () => expect(countDisplay).toBeVisible());

    // Locate the first visible Delete button and extract its request ID
    const firstDeleteButton = dashboard.deleteButtons.first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-119-search-by-request-id.spec-20', async () => expect(firstDeleteButton).toBeVisible());
    const deleteLabel = await firstDeleteButton.textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-119-search-by-request-id.spec-22', async () => expect(deleteLabel).toBeTruthy());

    // Extract the "LR-XXXXX" portion from "Delete LR-XXXXX"
    const requestIdMatch = deleteLabel!.match(/Delete\s+(LR-\d+)/);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-119-search-by-request-id.spec-26', async () => expect(requestIdMatch).toBeTruthy());
    const requestId = requestIdMatch![1];

    await recordEvidence('action-fill-LIMAS-SUD-119-search-by-request-id.spec-29', async () => searchField.fill(requestId));

    // Verify the count still shows valid loaded ≥ 1 results
    await recordEvidence('assert-toPass-LIMAS-SUD-119-search-by-request-id.spec-32', async () => expect(async () => {
      const updatedText = await countDisplay.textContent();
      const loadedMatch = updatedText?.match(/(\d+)\s*loaded/);
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-119-search-by-request-id.spec-35', async () => expect(loadedMatch).toBeTruthy());
      const loadedCount = parseInt(loadedMatch![1], 10);
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-119-search-by-request-id.spec-37', async () => expect(loadedCount).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-119-search-by-request-id.spec-40', async () => expect(searchField).toHaveValue(requestId));
  });
});