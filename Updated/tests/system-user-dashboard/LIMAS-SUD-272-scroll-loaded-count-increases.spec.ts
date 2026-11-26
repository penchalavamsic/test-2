import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-272: should increase loaded count after scrolling to bottom of pending requests table', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-272-scroll-loaded-count-increases.spec-10', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-272-scroll-loaded-count-increases.spec-11', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-272-scroll-loaded-count-increases.spec-14', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    // Capture initial loaded count
    const initialLoadedCount = await dashboard.getPendingRequestsLoadedCount();
    const totalCount = await dashboard.getPendingRequestsTotalCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-272-scroll-loaded-count-increases.spec-19', async () => expect(initialLoadedCount).toBeGreaterThan(0));

    await captureStepScreenshot(page, testInfo, 'before-scroll');

    // Scroll to bottom of table
    await dashboard.licenseRequestTable.evaluate((el) => {
      el.scrollIntoView(false);
    });
    await page.waitForTimeout(2000);

    await captureStepScreenshot(page, testInfo, 'after-first-scroll');

    // Scroll again to trigger more loading
    await dashboard.licenseRequestTable.evaluate((el) => {
      el.scrollIntoView(false);
    });
    await page.waitForTimeout(2000);

    await captureStepScreenshot(page, testInfo, 'after-second-scroll');

    // Third scroll
    await dashboard.licenseRequestTable.evaluate((el) => {
      el.scrollIntoView(false);
    });
    await page.waitForTimeout(2000);

    await captureStepScreenshot(page, testInfo, 'after-third-scroll');

    const finalLoadedCount = await dashboard.getPendingRequestsLoadedCount();

    // If total > initial, loaded count should have increased
    if (totalCount > initialLoadedCount) {
      await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-272-scroll-loaded-count-increases.spec-51', async () => expect(finalLoadedCount).toBeGreaterThan(initialLoadedCount));
    } else {
      // All records already loaded — loaded count must at least stay the same
      await recordEvidence('assert-toBe-LIMAS-SUD-272-scroll-loaded-count-increases.spec-54', async () => expect(finalLoadedCount).toBe(initialLoadedCount));
    }

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-272-scroll-loaded-count-increases.spec-57', async () => expect(finalLoadedCount).toBeGreaterThanOrEqual(1));
  });
});
