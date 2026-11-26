import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-137: Role reset on Profile change', () => {
  test('should reset Role to placeholder when Profile is changed', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-137-role-reset-on-profile-change.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-12', async () => approveButton.click());

    // Select User Group
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    // Select first Profile
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-19', async () => dashboard.approveFormProfileCombobox.click());
    const profileOptions = dashboard.approveFormListbox.getByRole('option');
    const profileCount = await profileOptions.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-137-role-reset-on-profile-change.spec-22', async () => expect(profileCount).toBeGreaterThanOrEqual(2));
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-23', async () => profileOptions.first().click());

    // Select a Role
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-26', async () => dashboard.approveFormRoleCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-27', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-137-role-reset-on-profile-change.spec-28', async () => expect(dashboard.approveFormRoleCombobox).not.toHaveText(/Select/));

    // Change Profile to a different option
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-31', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-32', async () => dashboard.approveFormListbox.getByRole('option').nth(1).click());

    // Role should reset to placeholder
    await recordEvidence('assert-toHaveText-LIMAS-SUD-137-role-reset-on-profile-change.spec-35', async () => expect(dashboard.approveFormRoleCombobox).toHaveText(/Select/));

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-137-role-reset-on-profile-change.spec-38', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-137-role-reset-on-profile-change.spec-39', async () => expect(approveButton).toHaveText('Approve'));
  });
});