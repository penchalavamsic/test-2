import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-075: should display at least one date in DD Mon YYYY format', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-075-created-date-visible.spec-10', async () => expect(loadedCount).toBeGreaterThan(0));

    const firstRow = dashboard.pendingRequestsFirstRow;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-075-created-date-visible.spec-13', async () => expect(firstRow).toBeVisible());

    const createdDateParagraph = dashboard.getPendingRequestCreatedDate(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-075-created-date-visible.spec-16', async () => expect(createdDateParagraph).toBeVisible());
    const createdDateText = ((await createdDateParagraph.textContent()) ?? '').trim();
    await recordEvidence('assert-toMatch-LIMAS-SUD-075-created-date-visible.spec-18', async () => expect(createdDateText).toMatch(/^\d{1,2}\s+[A-Z][a-z]{2}\s+\d{4}$/));
  });
});
