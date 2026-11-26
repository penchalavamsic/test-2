import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-089: License Assignment heading', () => {
  test('should show License Assignment heading in the inline form', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-089-license-assignment-heading.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-089-license-assignment-heading.spec-13', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'initial-request-row-loaded');

    await recordEvidence('action-click-LIMAS-SUD-089-license-assignment-heading.spec-16', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-089-license-assignment-heading.spec-18', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-089-license-assignment-heading.spec-19', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'inline-form-opened');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-089-license-assignment-heading.spec-21', async () => expect(dashboard.approveFormLicenseAssignment).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-089-license-assignment-heading.spec-22', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-heading-verified');

    await recordEvidence('action-click-LIMAS-SUD-089-license-assignment-heading.spec-25', async () => closeButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-089-license-assignment-heading.spec-26', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await captureStepScreenshot(page, testInfo, 'final-form-closed');
  });
});