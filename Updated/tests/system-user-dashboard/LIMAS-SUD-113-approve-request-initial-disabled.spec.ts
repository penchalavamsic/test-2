import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-113: Approve Request button initially disabled', () => {
  test('should show Approve Request button as disabled before required fields are filled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-113-approve-request-initial-disabled.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-113-approve-request-initial-disabled.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-113-approve-request-initial-disabled.spec-12', async () => approveButton.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-113-approve-request-initial-disabled.spec-14', async () => expect(dashboard.approveFormApproveRequestButton).toBeVisible());
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-113-approve-request-initial-disabled.spec-15', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Close form
    await recordEvidence('action-click-LIMAS-SUD-113-approve-request-initial-disabled.spec-18', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-113-approve-request-initial-disabled.spec-19', async () => expect(approveButton).toHaveText('Approve'));
  });
});