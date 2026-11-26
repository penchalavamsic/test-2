import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-101: Profile options after User Group selection', () => {
  test('should show Profile options list after selecting a User Group', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-101-profile-options-after-user-group.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-14', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-101-profile-options-after-user-group.spec-17', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-19', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-101-profile-options-after-user-group.spec-20', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-21', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-101-profile-options-after-user-group.spec-22', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    const userGroupCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /User Group/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-26', async () => expect(userGroupCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-101-profile-options-after-user-group.spec-27', async () => expect(userGroupCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-101-profile-options-after-user-group.spec-28', async () => userGroupCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-29', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const userGroupOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-31', async () => expect(userGroupOptions.first()).toBeVisible());
    const selectedUserGroupText = await userGroupOptions.first().textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-101-profile-options-after-user-group.spec-33', async () => expect(selectedUserGroupText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-101-profile-options-after-user-group.spec-34', async () => userGroupOptions.first().click());
    await recordEvidence('assert-toContainText-LIMAS-SUD-101-profile-options-after-user-group.spec-35', async () => expect(userGroupCombobox).toContainText(selectedUserGroupText ?? ''));
    await captureStepScreenshot(page, testInfo, 'user-group-selected');

    const profileCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /Profile/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-39', async () => expect(profileCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-101-profile-options-after-user-group.spec-40', async () => expect(profileCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-101-profile-options-after-user-group.spec-41', async () => profileCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-42', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const profileOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-101-profile-options-after-user-group.spec-44', async () => expect(profileOptions.first()).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'profile-options-visible');

    await recordEvidence('action-press-LIMAS-SUD-101-profile-options-after-user-group.spec-47', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-101-profile-options-after-user-group.spec-48', async () => expect(dashboard.approveFormListbox).toHaveCount(0));
    await recordEvidence('action-click-LIMAS-SUD-101-profile-options-after-user-group.spec-49', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-101-profile-options-after-user-group.spec-50', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-101-profile-options-after-user-group.spec-51', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-101-profile-options-after-user-group.spec-52', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});