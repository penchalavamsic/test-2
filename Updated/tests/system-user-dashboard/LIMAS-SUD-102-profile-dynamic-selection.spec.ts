import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-102: should update displayed value after selecting a Profile option', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-15', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-102-profile-dynamic-selection.spec-18', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-20', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-102-profile-dynamic-selection.spec-21', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-22', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-102-profile-dynamic-selection.spec-23', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    const userGroupCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /User Group/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-27', async () => expect(userGroupCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-102-profile-dynamic-selection.spec-28', async () => expect(userGroupCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-102-profile-dynamic-selection.spec-29', async () => userGroupCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-30', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const userGroupOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-32', async () => expect(userGroupOptions.first()).toBeVisible());
    const userGroupText = await userGroupOptions.first().textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-102-profile-dynamic-selection.spec-34', async () => expect(userGroupText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-102-profile-dynamic-selection.spec-35', async () => userGroupOptions.first().click());
    await recordEvidence('assert-toContainText-LIMAS-SUD-102-profile-dynamic-selection.spec-36', async () => expect(userGroupCombobox).toContainText(userGroupText ?? ''));
    await captureStepScreenshot(page, testInfo, 'user-group-selected');

    const profileCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /Profile/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-40', async () => expect(profileCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-102-profile-dynamic-selection.spec-41', async () => expect(profileCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-102-profile-dynamic-selection.spec-42', async () => profileCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-43', async () => expect(dashboard.approveFormListbox).toBeVisible());
    const profileOptions = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-102-profile-dynamic-selection.spec-45', async () => expect(profileOptions.first()).toBeVisible());
    const optionText = await profileOptions.first().textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-102-profile-dynamic-selection.spec-47', async () => expect(optionText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-102-profile-dynamic-selection.spec-48', async () => profileOptions.first().click());

    await recordEvidence('assert-toHaveText-LIMAS-SUD-102-profile-dynamic-selection.spec-50', async () => expect(profileCombobox).not.toHaveText('Select Profile'));
    await recordEvidence('assert-toContainText-LIMAS-SUD-102-profile-dynamic-selection.spec-51', async () => expect(profileCombobox).toContainText(optionText ?? ''));

    await captureStepScreenshot(page, testInfo, 'profile-selected');

    await recordEvidence('action-click-LIMAS-SUD-102-profile-dynamic-selection.spec-55', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-102-profile-dynamic-selection.spec-56', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-102-profile-dynamic-selection.spec-57', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-102-profile-dynamic-selection.spec-58', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});
