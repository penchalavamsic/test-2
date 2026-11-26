import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-080: should format every date as DD Mon YYYY', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-080-date-format-consistency.spec-10', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-080-date-format-consistency.spec-12', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const rows = dashboard.pendingRequestsDataRows;
    const count = await rows.count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-080-date-format-consistency.spec-16', async () => expect(count).toBeGreaterThan(0));

    const datePattern = /^\d{1,2}\s+[A-Z][a-z]{2,3}\s+\d{4}$/;

    for (let i = 0; i < count; i++) {
      const dateParagraph = dashboard.getPendingRequestCreatedDate(rows.nth(i));
      const text = await dateParagraph.textContent();
      await recordEvidence('assert-toMatch-LIMAS-SUD-080-date-format-consistency.spec-23', async () => expect(text?.trim()).toMatch(datePattern));
    }
  });
});
