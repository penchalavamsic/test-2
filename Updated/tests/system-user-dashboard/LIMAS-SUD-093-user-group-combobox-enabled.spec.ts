import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-093: User Group combobox enabled', () => {
  test('should show User Group combobox as enabled', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-093-user-group-combobox-enabled.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-093-user-group-combobox-enabled.spec-13', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'initial-request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-093-user-group-combobox-enabled.spec-16', async () => approveButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-093-user-group-combobox-enabled.spec-17', async () => expect(dashboard.getPendingRequestCloseButton(firstRow)).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-093-user-group-combobox-enabled.spec-18', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-093-user-group-combobox-enabled.spec-19', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'inline-form-opened');

    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-093-user-group-combobox-enabled.spec-22', async () => expect(dashboard.approveFormUserGroupCombobox).toBeEnabled());
    await captureStepScreenshot(page, testInfo, 'user-group-combobox-enabled');

    await recordEvidence('action-click-LIMAS-SUD-093-user-group-combobox-enabled.spec-25', async () => dashboard.getPendingRequestCloseButton(firstRow).click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-093-user-group-combobox-enabled.spec-26', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await captureStepScreenshot(page, testInfo, 'final-form-closed');
  });
});