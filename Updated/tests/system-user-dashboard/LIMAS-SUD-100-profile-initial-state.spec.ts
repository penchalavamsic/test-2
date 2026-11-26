import { recordEvidence } from '../helpers/step-evidence';
import { test, expect, captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-100: Profile initial state', () => {
  test('should show "Select Profile" placeholder before User Group selection', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-100-profile-initial-state.spec-8', async () => dashboard.pendingRequestsTab.click());
    await dashboard.waitForPendingRequestsReady();
    await captureStepScreenshot(page, testInfo, 'pending-requests-page-loaded');

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-100-profile-initial-state.spec-14', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'request-row-ready');

    await recordEvidence('action-click-LIMAS-SUD-100-profile-initial-state.spec-17', async () => approveButton.click());
    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-100-profile-initial-state.spec-19', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-100-profile-initial-state.spec-20', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-100-profile-initial-state.spec-21', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-100-profile-initial-state.spec-22', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await captureStepScreenshot(page, testInfo, 'license-assignment-form-opened');

    const profileCombobox = dashboard.approveFormContainer.getByRole('combobox', { name: /Profile/ });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-100-profile-initial-state.spec-26', async () => expect(profileCombobox).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-100-profile-initial-state.spec-27', async () => expect(profileCombobox).toHaveText('Select Profile'));
    await captureStepScreenshot(page, testInfo, 'profile-initial-state-verified');

    await recordEvidence('action-click-LIMAS-SUD-100-profile-initial-state.spec-30', async () => closeButton.click());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-100-profile-initial-state.spec-31', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-100-profile-initial-state.spec-32', async () => expect(approveButton).toHaveText('Approve'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-100-profile-initial-state.spec-33', async () => expect(approveButton).toHaveAttribute('aria-expanded', 'false'));
    await captureStepScreenshot(page, testInfo, 'form-restored');
  });
});