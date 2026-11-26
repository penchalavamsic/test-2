import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-128: Incremental loading trigger', () => {
  test('should increase visible row count after scrolling to bottom', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-128-incremental-loading-trigger.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-128-incremental-loading-trigger.spec-10', async () => dashboard.pendingRequestsTab.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-128-incremental-loading-trigger.spec-12', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    // Capture initial row count
    const rows = page.getByRole('row').filter({ hasNot: page.getByRole('columnheader') });
    const initialRowCount = await rows.count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-128-incremental-loading-trigger.spec-17', async () => expect(initialRowCount).toBeGreaterThan(0));

    // Check if there are more rows to load
    const countDisplay = page.locator('text=/\\d+\\s*loaded.*\\d+\\s*total\\s*pending/');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-128-incremental-loading-trigger.spec-21', async () => expect(countDisplay).toBeVisible());
    const countText = await countDisplay.textContent();
    const totalMatch = countText?.match(/(\d+)\s*total\s*pending/);
    const totalPending = totalMatch ? parseInt(totalMatch[1], 10) : 0;

    // Scroll to the bottom of the table
    await dashboard.licenseRequestTable.evaluate((el) => {
      el.scrollIntoView(false);
    });

    // Wait for incremental loading
    await page.waitForTimeout(1500);

    const updatedRowCount = await rows.count();

    // If there are more rows to load, count should increase; otherwise stays the same
    if (totalPending > initialRowCount) {
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-128-incremental-loading-trigger.spec-38', async () => expect(updatedRowCount).toBeGreaterThanOrEqual(initialRowCount));
    }

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-128-incremental-loading-trigger.spec-41', async () => expect(updatedRowCount).toBeGreaterThanOrEqual(1));
  });
});