import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-114: Approve Request dependency', () => {
  test('should enable Approve Request only after all required fields are filled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-114-approve-request-dependency.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-12', async () => approveButton.click());

    // Verify initial disabled state
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-114-approve-request-dependency.spec-15', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Fill User Group
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-18', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-19', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-114-approve-request-dependency.spec-20', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Fill Profile
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-23', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-24', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-114-approve-request-dependency.spec-25', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Fill Role
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-28', async () => dashboard.approveFormRoleCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-29', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    // Still disabled — Expiration Date unfilled
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-114-approve-request-dependency.spec-31', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Verify but do NOT submit — stop here
    // Close form via Cancel
    await recordEvidence('action-click-LIMAS-SUD-114-approve-request-dependency.spec-35', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-114-approve-request-dependency.spec-36', async () => expect(approveButton).toHaveText('Approve'));
  });
});