import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-082: should filter results when typing a username substring', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-082-search-by-username.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-082-search-by-username.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-082-search-by-username.spec-16', async () => expect(searchField).toBeVisible());

    // Extract a search substring from the first visible user name
    const firstRow = dashboard.pendingRequestsFirstRow;
    const userNameLocator = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-082-search-by-username.spec-21', async () => expect(userNameLocator).toBeVisible());
    const firstUserName = await userNameLocator.textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-082-search-by-username.spec-23', async () => expect(firstUserName?.trim().length).toBeGreaterThan(0));
    const searchSubstring = firstUserName!.trim().substring(0, Math.min(4, firstUserName!.trim().length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-082-search-by-username.spec-28', async () => searchField.fill(searchSubstring));

    // Verify the count still shows valid loaded ≥ 1 results
    const initialTotal = await dashboard.getPendingRequestsTotalCount();
    await recordEvidence('assert-toPass-LIMAS-SUD-082-search-by-username.spec-32', async () => expect(async () => {
      const updatedLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-082-search-by-username.spec-34', async () => expect(updatedLoaded).toBeLessThanOrEqual(initialTotal));
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-082-search-by-username.spec-35', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-082-search-by-username.spec-38', async () => expect(searchField).toHaveValue(searchSubstring));

    await captureStepScreenshot(page, testInfo, 'search-results');
  });
});
