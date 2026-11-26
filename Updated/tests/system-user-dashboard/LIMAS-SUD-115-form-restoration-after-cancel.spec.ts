import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-115: should reopen form with default empty state after cancel', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-115-form-restoration-after-cancel.spec-10', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-115-form-restoration-after-cancel.spec-13', async () => approveButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-115-form-restoration-after-cancel.spec-14', async () => expect(dashboard.approveFormLicenseAssignment).toBeVisible());

    // Fill some fields
    await recordEvidence('action-click-LIMAS-SUD-115-form-restoration-after-cancel.spec-17', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-115-form-restoration-after-cancel.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-115-form-restoration-after-cancel.spec-19', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-115-form-restoration-after-cancel.spec-20', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    await captureStepScreenshot(page, testInfo, 'fields-filled');

    // Cancel — form closes
    await recordEvidence('action-click-LIMAS-SUD-115-form-restoration-after-cancel.spec-25', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-115-form-restoration-after-cancel.spec-26', async () => expect(approveButton).toHaveText('Approve'));

    // Reopen the form
    await recordEvidence('action-click-LIMAS-SUD-115-form-restoration-after-cancel.spec-29', async () => approveButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-115-form-restoration-after-cancel.spec-30', async () => expect(dashboard.approveFormLicenseAssignment).toBeVisible());

    // Verify form is back to default state
    await recordEvidence('assert-toHaveText-LIMAS-SUD-115-form-restoration-after-cancel.spec-33', async () => expect(dashboard.approveFormUserGroupCombobox).toHaveText('Select User Group'));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-115-form-restoration-after-cancel.spec-34', async () => expect(dashboard.approveFormProfileCombobox).toHaveText('Select Profile'));
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-115-form-restoration-after-cancel.spec-35', async () => expect(dashboard.approveFormApproveRequestButton).toBeDisabled());

    await captureStepScreenshot(page, testInfo, 'restored-to-default');

    // Close form
    await recordEvidence('action-click-LIMAS-SUD-115-form-restoration-after-cancel.spec-40', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-115-form-restoration-after-cancel.spec-41', async () => expect(approveButton).toHaveText('Approve'));
  });
});
