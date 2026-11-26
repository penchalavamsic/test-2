import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-103: Role field visibility', () => {
  test('should show Role* combobox only after Profile is selected', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-103-role-field-visibility.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-14', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-103-role-field-visibility.spec-17', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-19', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-103-role-field-visibility.spec-20', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-21', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-103-role-field-visibility.spec-22', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    const roleCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /Role/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-26', async () => expect(roleCombobox).not.toBeVisible());
    const userGroupCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /User Group/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-28', async () => expect(userGroupCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-103-role-field-visibility.spec-29', async () => expect(userGroupCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-103-role-field-visibility.spec-30', async () => userGroupCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-31', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const userGroupOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-33', async () => expect(userGroupOptions.first()).toBeVisible());
    const userGroupText = await userGroupOptions.first().textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-103-role-field-visibility.spec-35', async () => expect(userGroupText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-103-role-field-visibility.spec-36', async () => userGroupOptions.first().click());
    await recordEvidence('assert-toContainText-LIMAS-SUD-103-role-field-visibility.spec-37', async () => expect(userGroupCombobox).toContainText(userGroupText ?? ''));
    await captureStepScreenshot(page, testInfo, 'user-group-selected');

    const profileCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /Profile/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-41', async () => expect(profileCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-103-role-field-visibility.spec-42', async () => expect(profileCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-103-role-field-visibility.spec-43', async () => profileCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-44', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const profileOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-46', async () => expect(profileOptions.first()).toBeVisible());
    const profileText = await profileOptions.first().textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-103-role-field-visibility.spec-48', async () => expect(profileText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-103-role-field-visibility.spec-49', async () => profileOptions.first().click());
    await recordEvidence('assert-toContainText-LIMAS-SUD-103-role-field-visibility.spec-50', async () => expect(profileCombobox).toContainText(profileText ?? ''));
    await captureStepScreenshot(page, testInfo, 'profile-selected-role-visible');

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-103-role-field-visibility.spec-53', async () => expect(roleCombobox).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-103-role-field-visibility.spec-54', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-103-role-field-visibility.spec-55', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-103-role-field-visibility.spec-56', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-103-role-field-visibility.spec-57', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});