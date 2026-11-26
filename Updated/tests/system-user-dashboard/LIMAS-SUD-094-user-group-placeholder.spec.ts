import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-094: User Group placeholder', () => {
  test('should show "Select User Group" placeholder', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-094-user-group-placeholder.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-094-user-group-placeholder.spec-14', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-094-user-group-placeholder.spec-17', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-094-user-group-placeholder.spec-19', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-094-user-group-placeholder.spec-20', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-094-user-group-placeholder.spec-21', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-094-user-group-placeholder.spec-22', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    const userGroupCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /User Group/ });
    await recordEvidence('assert-toHaveText-LIMAS-SUD-094-user-group-placeholder.spec-26', async () => expect(userGroupCombobox).toHaveText('Select User Group'));
    await captureStepScreenshot(page, testInfo, 'user-group-placeholder-verified');

    await recordEvidence('action-click-LIMAS-SUD-094-user-group-placeholder.spec-29', async () => closeButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-094-user-group-placeholder.spec-30', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-094-user-group-placeholder.spec-31', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-094-user-group-placeholder.spec-32', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});