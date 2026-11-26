import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-117: should filter results when typing a hardware ID substring', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-117-search-by-hardware-id.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-117-search-by-hardware-id.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-117-search-by-hardware-id.spec-16', async () => expect(searchField).toBeVisible());

    // Extract hardware ID from the first visible row
    const firstRow = dashboard.pendingRequestsFirstRow;
    const hwIdLocator = dashboard.getPendingRequestHardwareId(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-117-search-by-hardware-id.spec-21', async () => expect(hwIdLocator).toBeVisible());
    const hwIdText = await hwIdLocator.textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-117-search-by-hardware-id.spec-23', async () => expect(hwIdText?.trim().length).toBeGreaterThan(0));

    // Extract the numeric portion for searching
    const digitsMatch = hwIdText!.match(/"(\d+)"/);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-117-search-by-hardware-id.spec-27', async () => expect(digitsMatch).toBeTruthy());
    const numericPart = digitsMatch![1];
    const searchSubstring = numericPart.substring(0, Math.min(5, numericPart.length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-117-search-by-hardware-id.spec-33', async () => searchField.fill(searchSubstring));

    await recordEvidence('assert-toPass-LIMAS-SUD-117-search-by-hardware-id.spec-35', async () => expect(async () => {
      const updatedLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-117-search-by-hardware-id.spec-37', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-117-search-by-hardware-id.spec-40', async () => expect(searchField).toHaveValue(searchSubstring));

    await captureStepScreenshot(page, testInfo, 'search-results');
  });
});
