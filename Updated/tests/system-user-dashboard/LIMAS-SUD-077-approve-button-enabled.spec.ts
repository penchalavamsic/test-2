import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-077: should ensure Approve button is enabled in each visible row', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-077-approve-button-enabled.spec-10', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-077-approve-button-enabled.spec-12', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const rows = dashboard.pendingRequestsDataRows;
    const count = await rows.count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-077-approve-button-enabled.spec-16', async () => expect(count).toBeGreaterThan(0));

    for (let i = 0; i < count; i++) {
      const approveButton = dashboard.getPendingRequestApproveButton(rows.nth(i));
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-077-approve-button-enabled.spec-20', async () => expect(approveButton).toBeEnabled());
    }
  });
});
