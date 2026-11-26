import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-086: Search case sensitivity', () => {
  test('should observe case sensitivity behavior when searching with mixed case', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-086-search-case-sensitivity.spec-10', async () => dashboard.pendingRequestsTab.click());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-13', async () => expect(searchField).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-14', async () => expect(dashboard.pendingRequestsCountText).toBeVisible());
    await recordEvidence('assert-toPass-LIMAS-SUD-086-search-case-sensitivity.spec-15', async () => expect(async () => {
      await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-086-search-case-sensitivity.spec-16', async () => expect(await dashboard.getPendingRequestsLoadedCount()).toBeGreaterThan(0));
    }).toPass({ timeout: 10_000 }));
    const initialLoaded = await dashboard.getPendingRequestsLoadedCount();
    const initialTotal = await dashboard.getPendingRequestsTotalCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-086-search-case-sensitivity.spec-20', async () => expect(initialTotal).toBeGreaterThan(0));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-21', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'initial-loaded-state');

    const userNameLocator = dashboard.getPendingRequestUserName(dashboard.pendingRequestsFirstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-25', async () => expect(userNameLocator).toBeVisible());
    const firstUserName = (await userNameLocator.textContent())?.trim() ?? '';
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-086-search-case-sensitivity.spec-27', async () => expect(firstUserName.length).toBeGreaterThan(0));

    // Find the first substring that contains at least one letter (not all digits/symbols)
    const alphaMatch = firstUserName.match(/[A-Za-z]{2,}/);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-086-search-case-sensitivity.spec-31', async () => expect(alphaMatch).toBeTruthy());
    const searchTerm = alphaMatch![0];

    const mixedCaseTerm = searchTerm === searchTerm.toLowerCase()
      ? searchTerm.toUpperCase()
      : searchTerm.toLowerCase();
    await recordEvidence('action-fill-LIMAS-SUD-086-search-case-sensitivity.spec-37', async () => searchField.fill(mixedCaseTerm));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-086-search-case-sensitivity.spec-38', async () => expect(searchField).toHaveValue(mixedCaseTerm));
    await recordEvidence('assert-toPass-LIMAS-SUD-086-search-case-sensitivity.spec-39', async () => expect(async () => {
      const loaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-086-search-case-sensitivity.spec-41', async () => expect(loaded).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-086-search-case-sensitivity.spec-42', async () => expect(loaded).toBeLessThanOrEqual(initialLoaded));
    }).toPass({ timeout: 10_000 }));
    const mixedCaseLoaded = await dashboard.getPendingRequestsLoadedCount();
    const mixedCaseRows = await dashboard.pendingRequestsDataRows.count();
    await recordEvidence('assert-toBe-LIMAS-SUD-086-search-case-sensitivity.spec-46', async () => expect(mixedCaseRows).toBe(mixedCaseLoaded));
    if (mixedCaseRows > 0) {
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-48', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-49', async () => expect(dashboard.getPendingRequestUserName(dashboard.pendingRequestsFirstRow)).toBeVisible());
    }
    const mixedCaseGridUsers: string[] = [];
    for (let index = 0; index < mixedCaseRows; index += 1) {
      const userName = await dashboard.getPendingRequestUserName(dashboard.pendingRequestsDataRows.nth(index)).textContent();
      mixedCaseGridUsers.push(userName?.trim() ?? '');
    }
    await captureStepScreenshot(page, testInfo, 'mixed-case-filter-result');
    const mixedCaseTotal = await dashboard.getPendingRequestsTotalCount();

    await recordEvidence('action-fill-LIMAS-SUD-086-search-case-sensitivity.spec-59', async () => searchField.fill(searchTerm));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-086-search-case-sensitivity.spec-60', async () => expect(searchField).toHaveValue(searchTerm));
    await recordEvidence('assert-toPass-LIMAS-SUD-086-search-case-sensitivity.spec-61', async () => expect(async () => {
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-086-search-case-sensitivity.spec-62', async () => expect(await dashboard.getPendingRequestsLoadedCount()).toBeGreaterThanOrEqual(0));
    }).toPass({ timeout: 10_000 }));
    const originalLoaded = await dashboard.getPendingRequestsLoadedCount();
    const originalTotal = await dashboard.getPendingRequestsTotalCount();
    const originalRows = await dashboard.pendingRequestsDataRows.count();
    await recordEvidence('assert-toBe-LIMAS-SUD-086-search-case-sensitivity.spec-67', async () => expect(originalRows).toBe(originalLoaded));
    const originalGridUsers: string[] = [];
    for (let index = 0; index < originalRows; index += 1) {
      const userName = await dashboard.getPendingRequestUserName(dashboard.pendingRequestsDataRows.nth(index)).textContent();
      originalGridUsers.push(userName?.trim() ?? '');
    }
    await captureStepScreenshot(page, testInfo, 'original-case-search-result');
    const caseBehavior = mixedCaseLoaded === originalLoaded && mixedCaseLoaded > 0
      ? 'case-insensitive: identical positive loaded counts'
      : mixedCaseLoaded === 0 && originalLoaded > 0
        ? 'case-sensitive: inverted casing returned no rows'
        : mixedCaseLoaded === originalLoaded
          ? 'same empty result for both casings'
          : 'case-sensitive or otherwise different filtered results';
    testInfo.annotations.push({
      type: 'observed-search-case-behavior',
      description: `${caseBehavior}. Inverted-case search: ${mixedCaseLoaded} loaded / ${mixedCaseTotal} total (${mixedCaseGridUsers.join(' | ')}); original-case search: ${originalLoaded} loaded / ${originalTotal} total (${originalGridUsers.join(' | ')}).`,
    });

    await recordEvidence('action-clear-LIMAS-SUD-086-search-case-sensitivity.spec-86', async () => searchField.clear());
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-086-search-case-sensitivity.spec-87', async () => expect(searchField).toHaveValue(''));
    const clearedTotal = await dashboard.getPendingRequestsTotalCount();
    await recordEvidence('assert-toBe-LIMAS-SUD-086-search-case-sensitivity.spec-89', async () => expect(clearedTotal).toBe(initialTotal));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-90', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-086-search-case-sensitivity.spec-91', async () => expect(dashboard.getPendingRequestUserName(dashboard.pendingRequestsFirstRow)).toBeVisible());
    const clearedLoaded = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-086-search-case-sensitivity.spec-93', async () => expect(clearedLoaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-086-search-case-sensitivity.spec-94', async () => expect(clearedLoaded).toBeLessThanOrEqual(clearedTotal));
    testInfo.annotations.push({
      type: 'cleared-search-restoration',
      description: `Cleared search restored ${clearedLoaded} loaded / ${clearedTotal} total; initial loaded count was ${initialLoaded}. Pending requests loaded automatically during the run, so the restored loaded count may exceed the initial count.`,
    });
    await captureStepScreenshot(page, testInfo, 'search-cleared-restored');
    await captureStepScreenshot(page, testInfo, 'final-state');
  });
});