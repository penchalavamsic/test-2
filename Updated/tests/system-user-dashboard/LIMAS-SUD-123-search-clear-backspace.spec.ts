import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-123: should restore full list when deleting all characters with backspace', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-123-search-clear-backspace.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-123-search-clear-backspace.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-123-search-clear-backspace.spec-16', async () => expect(searchField).toBeVisible());

    // Capture initial loaded count
    const initialLoaded = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-123-search-clear-backspace.spec-20', async () => expect(initialLoaded).toBeGreaterThan(0));

    // Extract search substring from the first visible user name
    const firstRow = dashboard.pendingRequestsFirstRow;
    const userNameLocator = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-123-search-clear-backspace.spec-25', async () => expect(userNameLocator).toBeVisible());
    const firstUserName = await userNameLocator.textContent();
    const searchSubstring = firstUserName!.trim().substring(0, Math.min(4, firstUserName!.trim().length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-123-search-clear-backspace.spec-31', async () => searchField.fill(searchSubstring));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-123-search-clear-backspace.spec-32', async () => expect(searchField).toHaveValue(searchSubstring));

    // Delete all characters with backspace
    await recordEvidence('action-focus-LIMAS-SUD-123-search-clear-backspace.spec-35', async () => searchField.focus());
    for (let i = 0; i < searchSubstring.length; i++) {
      await recordEvidence('action-press-LIMAS-SUD-123-search-clear-backspace.spec-37', async () => page.keyboard.press('Backspace'));
    }

    // Verify search field is empty
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-123-search-clear-backspace.spec-41', async () => expect(searchField).toHaveValue(''));

    // Verify the loaded count is restored
    await recordEvidence('assert-toPass-LIMAS-SUD-123-search-clear-backspace.spec-44', async () => expect(async () => {
      const restoredLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-123-search-clear-backspace.spec-46', async () => expect(restoredLoaded).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));

    await captureStepScreenshot(page, testInfo, 'restored-after-backspace');
  });
});
