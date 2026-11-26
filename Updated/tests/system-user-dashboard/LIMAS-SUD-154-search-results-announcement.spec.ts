import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-154: Search results announcement (a11y)', () => {
  test('should document that search filtering is not announced to screen readers', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-154-search-results-announcement.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-154-search-results-announcement.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-154-search-results-announcement.spec-11', async () => expect(dashboard.licenseSearchInput).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-154-search-results-announcement.spec-12', async () => expect(dashboard.licenseSearchInput).toHaveAttribute('placeholder', 'Search license requests...'));

    // Record initial row count
    const initialRows = await dashboard.licenseRequestRows.count();

    // Type a filter that should reduce results
    await recordEvidence('action-fill-LIMAS-SUD-154-search-results-announcement.spec-18', async () => dashboard.licenseSearchInput.fill('ZZZ-UNLIKELY-MATCH'));

    // Check for live regions or status roles that would announce the change
    const liveRegions = page.locator('[aria-live]');
    const liveCount = await liveRegions.count();

    const statusRoles = page.locator('[role="status"]');
    const alertRoles = page.locator('[role="alert"]');

    // Document: filtering is visual-only; no accessible announcement
    // If live regions exist, they were pre-existing, not triggered by search
    const hasLiveAnnouncement = await page.locator('[aria-live]:has-text("result"), [role="status"]:has-text("result"), [role="alert"]:has-text("result")').count();

    // Clear search to restore
    await recordEvidence('action-clear-LIMAS-SUD-154-search-results-announcement.spec-32', async () => dashboard.licenseSearchInput.clear());

    // The key assertion: search filtering provides no accessible result announcement
    // This documents the gap — the test passes when no announcement is found
    await recordEvidence('assert-toBe-LIMAS-SUD-154-search-results-announcement.spec-36', async () => expect(hasLiveAnnouncement).toBe(0));
  });
});