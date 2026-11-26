import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-149: Approve disabled missing Expiration Date', () => {
  test('should keep Approve Request disabled when Expiration Date is not selected', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-12', async () => approveButton.click());

    // Select User Group
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    const firstGroup = dashboard.approveFormListbox.getByRole('option').first();
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-17', async () => firstGroup.click());

    // Select Profile
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-20', async () => dashboard.approveFormProfileCombobox.click());
    const firstProfile = dashboard.approveFormListbox.getByRole('option').first();
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-22', async () => firstProfile.click());

    // Select Role (may appear after Profile)
    const roleCombobox = dashboard.approveFormRoleCombobox;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-26', async () => expect(roleCombobox).toBeVisible({ timeout: 10_000 }));
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-27', async () => roleCombobox.click());
    const firstRole = dashboard.approveFormListbox.getByRole('option').first();
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-29', async () => firstRole.click());

    // Expiration Date field should be visible but empty — Approve Request still disabled
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-32', async () => expect(dashboard.approveFormExpirationDateLabel).toBeVisible({ timeout: 10_000 }));
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-33', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-36', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-149-approve-disabled-missing-expiration.spec-37', async () => expect(approveButton).toHaveText('Approve'));
  });
});