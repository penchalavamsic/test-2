import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-271: should show zero loaded results when searching nonexistent username', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-271-search-negative-user.spec-10', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-271-search-negative-user.spec-11', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-271-search-negative-user.spec-15', async () => expect(searchField).toBeVisible());

    // A username that does not exist in any pending request should yield zero results.
    const nonexistentUser = 'no-such-user-' + Date.now() + '@nowhere.test';

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-271-search-negative-user.spec-22', async () => searchField.fill(nonexistentUser));

    await recordEvidence('assert-toPass-LIMAS-SUD-271-search-negative-user.spec-24', async () => expect(async () => {
      const noMatchLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-271-search-negative-user.spec-26', async () => expect(noMatchLoaded).toBe(0));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-271-search-negative-user.spec-29', async () => expect(searchField).toHaveValue(nonexistentUser));

    await captureStepScreenshot(page, testInfo, 'no-match');
  });
});
