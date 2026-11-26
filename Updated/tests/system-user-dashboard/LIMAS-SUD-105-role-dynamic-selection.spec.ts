import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-105: should update displayed value after selecting a Role option', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-15', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-105-role-dynamic-selection.spec-18', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-20', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-105-role-dynamic-selection.spec-21', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-22', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-105-role-dynamic-selection.spec-23', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    const userGroupCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /User Group/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-27', async () => expect(userGroupCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-105-role-dynamic-selection.spec-28', async () => expect(userGroupCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-105-role-dynamic-selection.spec-29', async () => userGroupCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-30', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const userGroupOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-32', async () => expect(userGroupOptions.first()).toBeVisible());
    const userGroupText = await userGroupOptions.first().textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-105-role-dynamic-selection.spec-34', async () => expect(userGroupText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-105-role-dynamic-selection.spec-35', async () => userGroupOptions.first().click());
    await recordEvidence('assert-toContainText-LIMAS-SUD-105-role-dynamic-selection.spec-36', async () => expect(userGroupCombobox).toContainText(userGroupText ?? ''));
    await captureStepScreenshot(page, testInfo, 'user-group-selected');

    const profileCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /Profile/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-40', async () => expect(profileCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-105-role-dynamic-selection.spec-41', async () => expect(profileCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-105-role-dynamic-selection.spec-42', async () => profileCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-43', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const profileOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-45', async () => expect(profileOptions.first()).toBeVisible());
    const profileText = await profileOptions.first().textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-105-role-dynamic-selection.spec-47', async () => expect(profileText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-105-role-dynamic-selection.spec-48', async () => profileOptions.first().click());
    await recordEvidence('assert-toContainText-LIMAS-SUD-105-role-dynamic-selection.spec-49', async () => expect(profileCombobox).toContainText(profileText ?? ''));
    await captureStepScreenshot(page, testInfo, 'profile-selected');

    const roleCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /Role/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-53', async () => expect(roleCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-105-role-dynamic-selection.spec-54', async () => expect(roleCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-105-role-dynamic-selection.spec-55', async () => roleCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-56', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const roleOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-105-role-dynamic-selection.spec-58', async () => expect(roleOptions.first()).toBeVisible());
    const optionText = await roleOptions.first().textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-105-role-dynamic-selection.spec-60', async () => expect(optionText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-105-role-dynamic-selection.spec-61', async () => roleOptions.first().click());

    await recordEvidence('assert-toContainText-LIMAS-SUD-105-role-dynamic-selection.spec-63', async () => expect(roleCombobox).toContainText(optionText ?? ''));

    await captureStepScreenshot(page, testInfo, 'role-selected');

    await recordEvidence('action-click-LIMAS-SUD-105-role-dynamic-selection.spec-67', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-105-role-dynamic-selection.spec-68', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-105-role-dynamic-selection.spec-69', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-105-role-dynamic-selection.spec-70', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});
