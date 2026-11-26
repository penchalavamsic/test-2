import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-136: Profile reset on User Group change', () => {
  test('should reset Profile to placeholder when User Group is changed', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-12', async () => approveButton.click());

    // Select first User Group
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    const userGroupOptions = dashboard.approveFormListbox.getByRole('option');
    const ugCount = await userGroupOptions.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-18', async () => expect(ugCount).toBeGreaterThanOrEqual(2));
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-19', async () => userGroupOptions.first().click());

    // Select a Profile
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-22', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-23', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-24', async () => expect(dashboard.approveFormProfileCombobox).not.toHaveText('Select Profile'));

    // Change User Group to a different option
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-27', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-28', async () => dashboard.approveFormListbox.getByRole('option').nth(1).click());

    // Profile should reset to placeholder
    await recordEvidence('assert-toHaveText-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-31', async () => expect(dashboard.approveFormProfileCombobox).toHaveText('Select Profile'));

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-34', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-136-profile-reset-on-user-group-change.spec-35', async () => expect(approveButton).toHaveText('Approve'));
  });
});