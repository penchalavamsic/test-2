import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-096: should update displayed value after selecting a User Group option', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-096-user-group-dynamic-selection.spec-15', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-096-user-group-dynamic-selection.spec-18', async () => approveButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-096-user-group-dynamic-selection.spec-19', async () => expect(dashboard.getPendingRequestCloseButton(firstRow)).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-096-user-group-dynamic-selection.spec-20', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-096-user-group-dynamic-selection.spec-21', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    const userGroupCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /User Group/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-096-user-group-dynamic-selection.spec-25', async () => expect(userGroupCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-096-user-group-dynamic-selection.spec-26', async () => expect(userGroupCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-096-user-group-dynamic-selection.spec-27', async () => userGroupCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-096-user-group-dynamic-selection.spec-28', async () => expect(dashboard.approveFormListbox).toBeVisible());

    const options = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-096-user-group-dynamic-selection.spec-31', async () => expect(options.first()).toBeVisible());
    const firstOption = options.first();
    const optionText = await firstOption.textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-096-user-group-dynamic-selection.spec-34', async () => expect(optionText?.trim().length ?? 0).toBeGreaterThan(0));
    await recordEvidence('action-click-LIMAS-SUD-096-user-group-dynamic-selection.spec-35', async () => firstOption.click());

    // Verify the combobox no longer shows placeholder and reflects selection
    await recordEvidence('assert-toHaveText-LIMAS-SUD-096-user-group-dynamic-selection.spec-38', async () => expect(userGroupCombobox).not.toHaveText('Select User Group'));
    await recordEvidence('assert-toContainText-LIMAS-SUD-096-user-group-dynamic-selection.spec-39', async () => expect(userGroupCombobox).toContainText(optionText ?? ''));

    await captureStepScreenshot(page, testInfo, 'user-group-selected');

    await recordEvidence('action-click-LIMAS-SUD-096-user-group-dynamic-selection.spec-43', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-096-user-group-dynamic-selection.spec-44', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-096-user-group-dynamic-selection.spec-45', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-096-user-group-dynamic-selection.spec-46', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});
