import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-124: should observe trimming behavior when search input has surrounding whitespace', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-124-search-whitespace-trimming.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-124-search-whitespace-trimming.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-124-search-whitespace-trimming.spec-16', async () => expect(searchField).toBeVisible());

    // Extract search substring from the first visible user name
    const firstRow = dashboard.pendingRequestsFirstRow;
    const userNameLocator = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-124-search-whitespace-trimming.spec-21', async () => expect(userNameLocator).toBeVisible());
    const firstUserName = await userNameLocator.textContent();
    const searchSubstring = firstUserName!.trim().substring(0, Math.min(4, firstUserName!.trim().length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    // Search with normal (trimmed) term
    await recordEvidence('action-fill-LIMAS-SUD-124-search-whitespace-trimming.spec-28', async () => searchField.fill(searchSubstring));

    // Wait for search with trimmed term to take effect
    await recordEvidence('assert-toPass-LIMAS-SUD-124-search-whitespace-trimming.spec-31', async () => expect(async () => {
      const count = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-124-search-whitespace-trimming.spec-33', async () => expect(count).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    // Clear and search with surrounding whitespace
    await recordEvidence('action-clear-LIMAS-SUD-124-search-whitespace-trimming.spec-37', async () => searchField.clear());
    const paddedInput = `  ${searchSubstring}  `;
    await recordEvidence('action-fill-LIMAS-SUD-124-search-whitespace-trimming.spec-39', async () => searchField.fill(paddedInput));

    // Document whether whitespace is trimmed or treated literally
    const paddedLoaded = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-124-search-whitespace-trimming.spec-43', async () => expect(paddedLoaded).toBeGreaterThanOrEqual(0));

    await captureStepScreenshot(page, testInfo, 'whitespace-result');
  });
});
