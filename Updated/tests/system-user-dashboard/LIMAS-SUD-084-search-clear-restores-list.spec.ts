import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-084: should restore original loaded count after clearing the search field', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-084-search-clear-restores-list.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-084-search-clear-restores-list.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-084-search-clear-restores-list.spec-16', async () => expect(searchField).toBeVisible());

    // Capture initial loaded count
    const initialLoaded = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-084-search-clear-restores-list.spec-20', async () => expect(initialLoaded).toBeGreaterThan(0));

    // Extract search substring from the first visible user name
    const firstRow = dashboard.pendingRequestsFirstRow;
    const userNameLocator = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-084-search-clear-restores-list.spec-25', async () => expect(userNameLocator).toBeVisible());
    const firstUserName = await userNameLocator.textContent();
    const searchSubstring = firstUserName!.trim().substring(0, Math.min(4, firstUserName!.trim().length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-084-search-clear-restores-list.spec-31', async () => searchField.fill(searchSubstring));

    // Confirm search took effect
    await recordEvidence('assert-toPass-LIMAS-SUD-084-search-clear-restores-list.spec-34', async () => expect(async () => {
      const searchedCount = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-084-search-clear-restores-list.spec-36', async () => expect(searchedCount).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('action-clear-LIMAS-SUD-084-search-clear-restores-list.spec-39', async () => searchField.clear());

    // Verify the loaded count is restored
    await recordEvidence('assert-toPass-LIMAS-SUD-084-search-clear-restores-list.spec-42', async () => expect(async () => {
      const restoredLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-084-search-clear-restores-list.spec-44', async () => expect(restoredLoaded).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-084-search-clear-restores-list.spec-47', async () => expect(searchField).toHaveValue(''));

    await captureStepScreenshot(page, testInfo, 'restored-after-clear');
  });
});
