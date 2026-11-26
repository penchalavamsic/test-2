import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-122: should clear search and restore list when pressing Escape', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-122-search-clear-escape.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-122-search-clear-escape.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-122-search-clear-escape.spec-16', async () => expect(searchField).toBeVisible());

    // Capture initial loaded count
    const initialLoaded = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-122-search-clear-escape.spec-20', async () => expect(initialLoaded).toBeGreaterThan(0));

    // Extract search substring from the first visible user name
    const firstRow = dashboard.pendingRequestsFirstRow;
    const userNameLocator = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-122-search-clear-escape.spec-25', async () => expect(userNameLocator).toBeVisible());
    const firstUserName = await userNameLocator.textContent();
    const searchSubstring = firstUserName!.trim().substring(0, Math.min(4, firstUserName!.trim().length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-122-search-clear-escape.spec-31', async () => searchField.fill(searchSubstring));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-122-search-clear-escape.spec-32', async () => expect(searchField).toHaveValue(searchSubstring));

    // Confirm search took effect
    await recordEvidence('assert-toPass-LIMAS-SUD-122-search-clear-escape.spec-35', async () => expect(async () => {
      const searchedCount = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-122-search-clear-escape.spec-37', async () => expect(searchedCount).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    // Focus the search field and press Escape
    await recordEvidence('action-focus-LIMAS-SUD-122-search-clear-escape.spec-41', async () => searchField.focus());
    await recordEvidence('action-press-LIMAS-SUD-122-search-clear-escape.spec-42', async () => page.keyboard.press('Escape'));

    // Verify search field is cleared
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-122-search-clear-escape.spec-45', async () => expect(searchField).toHaveValue(''));

    // Verify the loaded count is restored
    await recordEvidence('assert-toPass-LIMAS-SUD-122-search-clear-escape.spec-48', async () => expect(async () => {
      const restoredLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-122-search-clear-escape.spec-50', async () => expect(restoredLoaded).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));

    await captureStepScreenshot(page, testInfo, 'restored-after-escape');
  });
});
