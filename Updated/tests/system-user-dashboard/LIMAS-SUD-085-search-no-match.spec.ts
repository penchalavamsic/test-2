import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-085: should show zero loaded results when searching nonexistent text', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-085-search-no-match.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-085-search-no-match.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-085-search-no-match.spec-16', async () => expect(searchField).toBeVisible());

    // Generate a nonexistent search string — a random hexadecimal string
    const nonexistent = 'x' + Math.random().toString(16).substring(2, 18);

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-085-search-no-match.spec-23', async () => searchField.fill(nonexistent));

    // Verify no-match: loaded count is 0
    await recordEvidence('assert-toPass-LIMAS-SUD-085-search-no-match.spec-26', async () => expect(async () => {
      const noMatchLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-085-search-no-match.spec-28', async () => expect(noMatchLoaded).toBe(0));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-085-search-no-match.spec-31', async () => expect(searchField).toHaveValue(nonexistent));

    await captureStepScreenshot(page, testInfo, 'no-match');
  });
});
