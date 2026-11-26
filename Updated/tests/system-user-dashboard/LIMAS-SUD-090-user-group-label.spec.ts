import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-090: User Group label', () => {
  test('should show User Group* label in the inline form', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-090-user-group-label.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-090-user-group-label.spec-13', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'initial-request-row-loaded');

    await recordEvidence('action-click-LIMAS-SUD-090-user-group-label.spec-16', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-090-user-group-label.spec-18', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-090-user-group-label.spec-19', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'inline-form-opened');

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-090-user-group-label.spec-22', async () => expect(dashboard.approveFormUserGroupLabel).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-090-user-group-label.spec-23', async () => expect(dashboard.approveFormUserGroupLabel).toHaveText('User Group*'));
    await captureStepScreenshot(page, testInfo, 'user-group-label-verified');

    await recordEvidence('action-click-LIMAS-SUD-090-user-group-label.spec-26', async () => closeButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-090-user-group-label.spec-27', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await captureStepScreenshot(page, testInfo, 'final-form-closed');
  });
});