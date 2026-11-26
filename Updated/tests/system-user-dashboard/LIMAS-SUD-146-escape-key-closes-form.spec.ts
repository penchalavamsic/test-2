import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-146: Escape key closes form', () => {
  test('should close the approval form when Escape is pressed', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-146-escape-key-closes-form.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-146-escape-key-closes-form.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.pendingRequestsFirstRow.locator('button[aria-expanded]');
    await recordEvidence('action-click-LIMAS-SUD-146-escape-key-closes-form.spec-12', async () => approveButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-146-escape-key-closes-form.spec-13', async () => expect(dashboard.approveFormLicenseAssignment).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-146-escape-key-closes-form.spec-14', async () => expect(approveButton).toHaveText('Close'));

    // Press Escape to close the form
    await recordEvidence('action-press-LIMAS-SUD-146-escape-key-closes-form.spec-17', async () => page.keyboard.press('Escape'));

    // Form should close and button revert to "Approve"
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-146-escape-key-closes-form.spec-20', async () => expect(dashboard.approveFormLicenseAssignment).not.toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-146-escape-key-closes-form.spec-21', async () => expect(approveButton).toHaveText('Approve'));
  });
});