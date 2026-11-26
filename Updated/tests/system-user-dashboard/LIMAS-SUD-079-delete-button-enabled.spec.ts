import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-079: should ensure Delete button is enabled in each visible row', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-079-delete-button-enabled.spec-10', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-079-delete-button-enabled.spec-12', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const rows = dashboard.pendingRequestsDataRows;
    const count = await rows.count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-079-delete-button-enabled.spec-16', async () => expect(count).toBeGreaterThan(0));

    for (let i = 0; i < count; i++) {
      const deleteButton = dashboard.getPendingRequestDeleteButton(rows.nth(i));
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-079-delete-button-enabled.spec-20', async () => expect(deleteButton).toBeEnabled());
    }
  });
});
