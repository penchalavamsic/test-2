import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-150: All fields enabled Approve Request', () => {
  test('should enable Approve Request after all required fields are filled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-150-all-fields-enabled-approve.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-12', async () => approveButton.click());

    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-150-all-fields-enabled-approve.spec-14', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Select User Group
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-17', async () => dashboard.approveFormUserGroupCombobox.click());
    const firstGroup = dashboard.approveFormListbox.getByRole('option').first();
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-19', async () => firstGroup.click());
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-150-all-fields-enabled-approve.spec-20', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    // Select Profile
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-23', async () => dashboard.approveFormProfileCombobox.click());
    const firstProfile = dashboard.approveFormListbox.getByRole('option').first();
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-25', async () => firstProfile.click());

    // Select Role
    const roleCombobox = dashboard.approveFormRoleCombobox;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-150-all-fields-enabled-approve.spec-29', async () => expect(roleCombobox).toBeVisible({ timeout: 10_000 }));
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-30', async () => roleCombobox.click());
    const firstRole = dashboard.approveFormListbox.getByRole('option').first();
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-32', async () => firstRole.click());

    // Select Expiration Date — click the label area to open calendar, then pick today or first available
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-150-all-fields-enabled-approve.spec-35', async () => expect(dashboard.approveFormExpirationDateLabel).toBeVisible({ timeout: 10_000 }));

    // Try clicking on a date button in the calendar if rendered, or find the date input
    const dateInput = page.getByLabel(/Expiration Date/);
    const dateButton = page.getByRole('button').filter({ hasText: /\d{1,2}/ }).first();

    if (await dateButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-42', async () => dateButton.click());
    }

    // After selecting date, Approve Request should be enabled
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-150-all-fields-enabled-approve.spec-46', async () => expect(dashboard.approveFormApproveRequestButton).toBeEnabled({ timeout: 10_000 }));

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-150-all-fields-enabled-approve.spec-49', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-150-all-fields-enabled-approve.spec-50', async () => expect(approveButton).toHaveText('Approve'));
  });
});