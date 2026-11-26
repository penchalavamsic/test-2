import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-098: Profile required indicator', () => {
  test('should show asterisk on Profile label indicating required field', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-098-profile-required-indicator.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-098-profile-required-indicator.spec-14', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-098-profile-required-indicator.spec-17', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-098-profile-required-indicator.spec-19', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-098-profile-required-indicator.spec-20', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-098-profile-required-indicator.spec-21', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-098-profile-required-indicator.spec-22', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    await recordEvidence('assert-toHaveText-LIMAS-SUD-098-profile-required-indicator.spec-25', async () => expect(dashboard.approveFormContainer.getByText('Profile*', { exact: true })).toHaveText(/Profile\*/));
    await captureStepScreenshot(page, testInfo, 'profile-required-indicator-verified');

    await recordEvidence('action-click-LIMAS-SUD-098-profile-required-indicator.spec-28', async () => closeButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-098-profile-required-indicator.spec-29', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-098-profile-required-indicator.spec-30', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-098-profile-required-indicator.spec-31', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});