import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-087: should open inline form and change Approve button to Close', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.waitForPendingRequestsReady();

    const firstRow = dashboard.pendingRequestsFirstRow;
    const approveButton = dashboard.getPendingRequestApproveButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-087-approve-opens-inline-form.spec-14', async () => expect(approveButton).toBeVisible());
    await captureStepScreenshot(page, testInfo, 'approve-button-closed');

    await recordEvidence('action-click-LIMAS-SUD-087-approve-opens-inline-form.spec-17', async () => approveButton.click());

    const closeButton = dashboard.getPendingRequestCloseButton(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-087-approve-opens-inline-form.spec-20', async () => expect(closeButton).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-087-approve-opens-inline-form.spec-21', async () => expect(closeButton).toHaveAttribute('aria-expanded', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-087-approve-opens-inline-form.spec-22', async () => expect(dashboard.approveFormContainer).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-087-approve-opens-inline-form.spec-23', async () => expect(dashboard.approveFormLicenseAssignment).toHaveText('License Assignment'));
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-087-approve-opens-inline-form.spec-24', async () => expect(approveButton).toHaveCount(0));
    await captureStepScreenshot(page, testInfo, 'form-opened-close-verified');

    await recordEvidence('action-click-LIMAS-SUD-087-approve-opens-inline-form.spec-27', async () => closeButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-087-approve-opens-inline-form.spec-28', async () => expect(approveButton).toBeVisible());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-087-approve-opens-inline-form.spec-29', async () => expect(dashboard.approveFormContainer).toHaveCount(0));
    await captureStepScreenshot(page, testInfo, 'final-row-restored');
  });
});
