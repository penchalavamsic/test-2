import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-183: should complete initial page rendering after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-183-initial-page-rendering-complete.spec-9', async () => dashboard.licenseHistorySwitch.click());

    // Wait for processed subtitle to confirm view transition
    const processedSubtitle = page.getByText('Processed License Requests — approved or deleted.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-183-initial-page-rendering-complete.spec-13', async () => expect(processedSubtitle).toBeVisible());

    // Verify count text is visible with valid numbers
    const countText = page.getByText(/\d+\s*loaded[·•]\d+\s*total\s+processed/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-183-initial-page-rendering-complete.spec-17', async () => expect(countText).toBeVisible());

    const text = await countText.textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-183-initial-page-rendering-complete.spec-20', async () => expect(text).toBeTruthy());

    const loadedMatch = text!.match(/(\d+)\s*loaded/i);
    const totalMatch = text!.match(/(\d+)\s*total\s+processed/i);
    await recordEvidence('assert-toBeNull-LIMAS-SUD-183-initial-page-rendering-complete.spec-24', async () => expect(loadedMatch).not.toBeNull());
    await recordEvidence('assert-toBeNull-LIMAS-SUD-183-initial-page-rendering-complete.spec-25', async () => expect(totalMatch).not.toBeNull());

    const loaded = parseInt(loadedMatch![1], 10);
    const total = parseInt(totalMatch![1], 10);
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-183-initial-page-rendering-complete.spec-29', async () => expect(loaded).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-183-initial-page-rendering-complete.spec-30', async () => expect(total).toBeGreaterThanOrEqual(0));

    // Verify items are rendered
    const userHeadings = page.getByText('User');
    const headingCount = await userHeadings.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-183-initial-page-rendering-complete.spec-35', async () => expect(headingCount).toBeGreaterThanOrEqual(1));

    // Verify load-more note is visible
    const loadMoreNote = page.getByText('More requests will load automatically.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-183-initial-page-rendering-complete.spec-39', async () => expect(loadMoreNote).toBeVisible());
  });
});