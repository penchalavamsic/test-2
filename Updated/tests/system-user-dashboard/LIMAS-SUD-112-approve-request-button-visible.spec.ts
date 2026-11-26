import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-112: Approve Request button visible', () => {
  test('should show Approve Request button in the inline form', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-112-approve-request-button-visible.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-112-approve-request-button-visible.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-112-approve-request-button-visible.spec-12', async () => approveButton.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-112-approve-request-button-visible.spec-14', async () => expect(dashboard.approveFormApproveRequestButton).toBeVisible());

    // Close form
    await recordEvidence('action-click-LIMAS-SUD-112-approve-request-button-visible.spec-17', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-112-approve-request-button-visible.spec-18', async () => expect(approveButton).toHaveText('Approve'));
  });
});