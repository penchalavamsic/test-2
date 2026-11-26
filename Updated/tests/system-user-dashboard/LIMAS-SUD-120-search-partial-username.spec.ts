import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-120: should return results when searching with a single character from a user name', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-120-search-partial-username.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-120-search-partial-username.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-120-search-partial-username.spec-16', async () => expect(searchField).toBeVisible());

    // Extract a single alphabetic character from the first visible user name
    const firstRow = dashboard.pendingRequestsFirstRow;
    const userNameLocator = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-120-search-partial-username.spec-21', async () => expect(userNameLocator).toBeVisible());
    const firstUserName = await userNameLocator.textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-120-search-partial-username.spec-23', async () => expect(firstUserName?.trim().length).toBeGreaterThan(0));

    const alphaMatch = firstUserName!.trim().match(/[A-Za-z]/);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-120-search-partial-username.spec-26', async () => expect(alphaMatch).toBeTruthy());
    const singleChar = alphaMatch![0];

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-120-search-partial-username.spec-31', async () => searchField.fill(singleChar));

    await recordEvidence('assert-toPass-LIMAS-SUD-120-search-partial-username.spec-33', async () => expect(async () => {
      const updatedLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-120-search-partial-username.spec-35', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-120-search-partial-username.spec-38', async () => expect(searchField).toHaveValue(singleChar));

    await captureStepScreenshot(page, testInfo, 'search-results');
  });
});
