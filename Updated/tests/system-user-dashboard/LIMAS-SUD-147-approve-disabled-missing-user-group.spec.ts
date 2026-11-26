import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-147: Approve disabled missing User Group', () => {
  test('should keep Approve Request disabled when User Group is not selected', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-147-approve-disabled-missing-user-group.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-147-approve-disabled-missing-user-group.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-147-approve-disabled-missing-user-group.spec-12', async () => approveButton.click());

    // Immediately check: no User Group selected, Approve Request should be disabled
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-147-approve-disabled-missing-user-group.spec-15', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-147-approve-disabled-missing-user-group.spec-18', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-147-approve-disabled-missing-user-group.spec-19', async () => expect(approveButton).toHaveText('Approve'));
  });
});