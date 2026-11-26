import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-111: should close form and revert Approve button when Cancel is clicked', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-111-cancel-closes-without-saving.spec-10', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-111-cancel-closes-without-saving.spec-13', async () => approveButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-111-cancel-closes-without-saving.spec-14', async () => expect(dashboard.approveFormLicenseAssignment).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'form-opened');

    // Click Cancel
    await recordEvidence('action-click-LIMAS-SUD-111-cancel-closes-without-saving.spec-18', async () => dashboard.approveFormCancelButton.click());

    // Form should close and Approve button should reappear
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-111-cancel-closes-without-saving.spec-21', async () => expect(dashboard.approveFormLicenseAssignment).not.toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-111-cancel-closes-without-saving.spec-22', async () => expect(approveButton).toHaveText('Approve'));
    await captureStepScreenshot(page, testInfo, 'form-closed');
  });
});
