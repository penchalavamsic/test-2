import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-270: should show zero loaded results when searching invalid feature name', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-270-search-negative-feature.spec-10', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-270-search-negative-feature.spec-11', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-270-search-negative-feature.spec-15', async () => expect(searchField).toBeVisible());

    // Feature names are readable labels like "MATLAB". A random junk string
    // with special characters should return zero results.
    const invalidFeature = 'ZZZZ-NO-FEATURE-{}$%^';

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-270-search-negative-feature.spec-23', async () => searchField.fill(invalidFeature));

    await recordEvidence('assert-toPass-LIMAS-SUD-270-search-negative-feature.spec-25', async () => expect(async () => {
      const noMatchLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-270-search-negative-feature.spec-27', async () => expect(noMatchLoaded).toBe(0));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-270-search-negative-feature.spec-30', async () => expect(searchField).toHaveValue(invalidFeature));

    await captureStepScreenshot(page, testInfo, 'no-match');
  });
});
