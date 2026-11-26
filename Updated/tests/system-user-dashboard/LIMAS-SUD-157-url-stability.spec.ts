import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-157: URL stability during interactions', () => {
  test('should keep URL on /system-user-dashboard during all dashboard interactions', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const assertRoute = async () => {
      const url = page.url();
      await recordEvidence('assert-toContain-LIMAS-SUD-157-url-stability.spec-12', async () => expect(url).toContain('/system-user-dashboard'));
    };

    await assertRoute();

    // Click Pending License Requests card
    await recordEvidence('action-click-LIMAS-SUD-157-url-stability.spec-17', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-157-url-stability.spec-18', async () => expect(dashboard.licenseRequestTable).toBeVisible());
    await assertRoute();

    // Open Approve form
    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-157-url-stability.spec-23', async () => approveButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-157-url-stability.spec-24', async () => expect(dashboard.approveFormApproveRequestButton).toBeVisible());
    await assertRoute();

    // Close form with Cancel
    await recordEvidence('action-click-LIMAS-SUD-157-url-stability.spec-28', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-157-url-stability.spec-29', async () => expect(approveButton).toHaveText('Approve'));
    await assertRoute();

    // Type in search
    await recordEvidence('action-fill-LIMAS-SUD-157-url-stability.spec-33', async () => dashboard.licenseSearchInput.fill('test'));
    await assertRoute();

    // Clear search
    await recordEvidence('action-clear-LIMAS-SUD-157-url-stability.spec-37', async () => dashboard.licenseSearchInput.clear());
    await assertRoute();
  });
});