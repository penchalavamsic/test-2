import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-269: should show zero loaded results when searching invalid hardware ID pattern', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-269-search-negative-hardware-id.spec-10', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-269-search-negative-hardware-id.spec-11', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-269-search-negative-hardware-id.spec-15', async () => expect(searchField).toBeVisible());

    // Hardware IDs follow a numeric pattern like "12345". An invalid pattern
    // with mixed non-numeric characters should yield no results.
    const invalidHwId = 'HW-INVALID-!@#$%';

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-269-search-negative-hardware-id.spec-23', async () => searchField.fill(invalidHwId));

    await recordEvidence('assert-toPass-LIMAS-SUD-269-search-negative-hardware-id.spec-25', async () => expect(async () => {
      const noMatchLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-269-search-negative-hardware-id.spec-27', async () => expect(noMatchLoaded).toBe(0));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-269-search-negative-hardware-id.spec-30', async () => expect(searchField).toHaveValue(invalidHwId));

    await captureStepScreenshot(page, testInfo, 'no-match');
  });
});
