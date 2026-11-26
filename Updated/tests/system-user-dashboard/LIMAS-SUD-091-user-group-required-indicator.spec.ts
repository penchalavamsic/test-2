import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-091: User Group required indicator', () => {
  test('should show asterisk on User Group label indicating required field', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-091-user-group-required-indicator.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-091-user-group-required-indicator.spec-13', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'initial-request-row-loaded');

    await recordEvidence('action-click-LIMAS-SUD-091-user-group-required-indicator.spec-16', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-091-user-group-required-indicator.spec-18', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-091-user-group-required-indicator.spec-19', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'inline-form-opened');

    await recordEvidence('assert-toHaveText-LIMAS-SUD-091-user-group-required-indicator.spec-22', async () => expect(dashboard.approveFormUserGroupLabel).toHaveText('User Group*'));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-091-user-group-required-indicator.spec-23', async () => expect(dashboard.approveFormUserGroupRequiredIndicator).toHaveText('*'));
    await captureStepScreenshot(page, testInfo, 'required-indicator-verified');

    await recordEvidence('action-click-LIMAS-SUD-091-user-group-required-indicator.spec-26', async () => closeButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-091-user-group-required-indicator.spec-27', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await captureStepScreenshot(page, testInfo, 'final-form-closed');
  });
});