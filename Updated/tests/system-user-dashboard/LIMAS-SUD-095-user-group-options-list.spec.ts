import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-095: User Group options list', () => {
  test('should show options when User Group combobox is clicked', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-095-user-group-options-list.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-095-user-group-options-list.spec-14', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-095-user-group-options-list.spec-17', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-095-user-group-options-list.spec-19', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-095-user-group-options-list.spec-20', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-095-user-group-options-list.spec-21', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-095-user-group-options-list.spec-22', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    const userGroupCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /User Group/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-095-user-group-options-list.spec-26', async () => expect(userGroupCombobox).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-095-user-group-options-list.spec-27', async () => expect(userGroupCombobox).toBeEnabled());
    await recordEvidence('action-click-LIMAS-SUD-095-user-group-options-list.spec-28', async () => userGroupCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-095-user-group-options-list.spec-29', async () => expect(dashboard.approveFormListbox).toBeVisible());

    const options = dashboard.approveFormListbox.getByRole('option');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-095-user-group-options-list.spec-32', async () => expect(options.first()).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'user-group-options-visible');

    await recordEvidence('action-press-LIMAS-SUD-095-user-group-options-list.spec-35', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-095-user-group-options-list.spec-36', async () => expect(dashboard.approveFormListbox).toHaveCount(0));
    await recordEvidence('action-click-LIMAS-SUD-095-user-group-options-list.spec-37', async () => closeButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-095-user-group-options-list.spec-38', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-095-user-group-options-list.spec-39', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-095-user-group-options-list.spec-40', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});