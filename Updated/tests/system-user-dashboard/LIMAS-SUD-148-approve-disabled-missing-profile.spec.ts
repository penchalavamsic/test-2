import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-148: Approve disabled missing Profile', () => {
  test('should keep Approve Request disabled when Profile is not selected', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-148-approve-disabled-missing-profile.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-148-approve-disabled-missing-profile.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-148-approve-disabled-missing-profile.spec-12', async () => approveButton.click());

    // Select User Group but NOT Profile
    await recordEvidence('action-click-LIMAS-SUD-148-approve-disabled-missing-profile.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    const firstGroup = dashboard.approveFormListbox.getByRole('option').first();
    await recordEvidence('action-click-LIMAS-SUD-148-approve-disabled-missing-profile.spec-17', async () => firstGroup.click());

    // Approve Request should still be disabled because Profile is missing
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-148-approve-disabled-missing-profile.spec-20', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-148-approve-disabled-missing-profile.spec-23', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-148-approve-disabled-missing-profile.spec-24', async () => expect(approveButton).toHaveText('Approve'));
  });
});