import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-076: should display an Approve button in each visible row', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-076-approve-button-visible.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-076-approve-button-visible.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    await captureStepScreenshot(page, testInfo, 'dashboard-loaded');

    const rows = dashboard.pendingRequestsDataRows;
    const count = await rows.count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-076-approve-button-visible.spec-19', async () => expect(count).toBeGreaterThan(0));

    for (let i = 0; i < count; i++) {
      const approveButton = dashboard.getPendingRequestApproveButton(rows.nth(i));
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-076-approve-button-visible.spec-23', async () => expect(approveButton).toBeVisible());
    }

    await captureStepScreenshot(page, testInfo, 'all-rows-verified');
  });
});
