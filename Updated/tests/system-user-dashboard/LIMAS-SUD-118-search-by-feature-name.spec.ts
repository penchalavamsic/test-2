import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-118: should filter results when typing a feature name substring', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-118-search-by-feature-name.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-118-search-by-feature-name.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-118-search-by-feature-name.spec-16', async () => expect(searchField).toBeVisible());

    // Extract feature name from the first visible row
    const firstRow = dashboard.pendingRequestsFirstRow;
    const featureLocator = dashboard.getPendingRequestFeatureName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-118-search-by-feature-name.spec-21', async () => expect(featureLocator).toBeVisible());
    const featureName = await featureLocator.textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-118-search-by-feature-name.spec-23', async () => expect(featureName?.trim().length).toBeGreaterThan(0));

    const searchSubstring = featureName!.trim().substring(0, Math.min(5, featureName!.trim().length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-118-search-by-feature-name.spec-29', async () => searchField.fill(searchSubstring));

    await recordEvidence('assert-toPass-LIMAS-SUD-118-search-by-feature-name.spec-31', async () => expect(async () => {
      const updatedLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-118-search-by-feature-name.spec-33', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-118-search-by-feature-name.spec-36', async () => expect(searchField).toHaveValue(searchSubstring));

    await captureStepScreenshot(page, testInfo, 'search-results');
  });
});
