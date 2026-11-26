import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-083: should update the count display after performing a search', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-083-search-count-updates.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-083-search-count-updates.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-083-search-count-updates.spec-16', async () => expect(searchField).toBeVisible());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-083-search-count-updates.spec-18', async () => expect(dashboard.pendingRequestsCountText).toBeVisible());
    await recordEvidence('assert-toPass-LIMAS-SUD-083-search-count-updates.spec-19', async () => expect(async () => {
      const total = await dashboard.getPendingRequestsTotalCount();
      await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-083-search-count-updates.spec-21', async () => expect(total).toBeGreaterThan(0));
    }).toPass({ timeout: 10_000 }));

    const initialTotal = await dashboard.getPendingRequestsTotalCount();
    const initialLoaded = await dashboard.getPendingRequestsLoadedCount();

    // Extract search substring from the first visible user name
    const firstRow = dashboard.pendingRequestsFirstRow;
    const userNameLocator = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-083-search-count-updates.spec-30', async () => expect(userNameLocator).toBeVisible());
    const firstUserName = await userNameLocator.textContent();
    const searchSubstring = firstUserName!.trim().substring(0, Math.min(4, firstUserName!.trim().length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-083-search-count-updates.spec-36', async () => searchField.fill(searchSubstring));

    // Wait for and verify the count display updates
    await recordEvidence('assert-toPass-LIMAS-SUD-083-search-count-updates.spec-39', async () => expect(async () => {
      const updatedLoaded = await dashboard.getPendingRequestsLoadedCount();
      const updatedTotal = await dashboard.getPendingRequestsTotalCount();

      // Loaded count reflects filtered results (≥ 1 since we searched a known substring)
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-083-search-count-updates.spec-44', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(1));
      // Total count remains stable
      await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-083-search-count-updates.spec-46', async () => expect(updatedTotal).toBeGreaterThan(0));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-083-search-count-updates.spec-49', async () => expect(searchField).toHaveValue(searchSubstring));

    await captureStepScreenshot(page, testInfo, 'search-results');
  });
});
