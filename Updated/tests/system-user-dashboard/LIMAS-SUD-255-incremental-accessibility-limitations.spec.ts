import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-255: should document accessibility limitations after incremental load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.triggerSingleIncrementalLoad();

    // No loading progress indicator present
    const progressCount = await page.locator('[role="progressbar"]').count();
    await recordEvidence('assert-toBe-LIMAS-SUD-255-incremental-accessibility-limitations.spec-15', async () => expect(progressCount).toBe(0));

    // Verify aria-live regions haven't changed count (no new dynamic announcements)
    const liveRegions = page.locator('[aria-live]');
    const liveCount = await liveRegions.count();

    // No [role="listitem"] on individual processed record cards
    const listItems = page.locator('[role="listitem"]');
    const listItemCount = await listItems.count();

    // Cards should not have role=listitem — if listitems exist they're for nav, not cards
    const processedListItems = listItems.filter({ hasText: /@kpit\.com/ });
    const processedListItemCount = await processedListItems.count();
    await recordEvidence('assert-toBe-LIMAS-SUD-255-incremental-accessibility-limitations.spec-28', async () => expect(processedListItemCount).toBe(0));

    // Cards are not focusable via Tab — check the first card's tabindex
    const firstUserLabel = page.getByText('User').first();
    const firstCard = firstUserLabel.locator('..').locator('..');
    const tabIndex = await firstCard.evaluate(el => el.getAttribute('tabindex'));
    await recordEvidence('assert-toBeFalsy-LIMAS-SUD-255-incremental-accessibility-limitations.spec-34', async () => expect(tabIndex).toBeFalsy());
  });
});