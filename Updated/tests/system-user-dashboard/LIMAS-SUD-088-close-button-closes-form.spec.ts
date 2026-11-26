import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-088: Close button closes form', () => {
  test('should close inline form and revert to Approve button when Close is clicked', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-088-close-button-closes-form.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-088-close-button-closes-form.spec-13', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'initial-request-row-loaded');

    await recordEvidence('action-click-LIMAS-SUD-088-close-button-closes-form.spec-16', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-088-close-button-closes-form.spec-18', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-088-close-button-closes-form.spec-19', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'inline-form-opened');
    await captureStepScreenshot(page, testInfo, 'close-control-and-form-verified');

    await recordEvidence('action-click-LIMAS-SUD-088-close-button-closes-form.spec-23', async () => closeButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-088-close-button-closes-form.spec-24', async () => expect(approveButton).toBeVisible());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-088-close-button-closes-form.spec-25', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await captureStepScreenshot(page, testInfo, 'form-closed-row-restored');
  });
});