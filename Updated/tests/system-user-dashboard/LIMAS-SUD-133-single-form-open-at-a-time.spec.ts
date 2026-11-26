import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-133: Single form open at a time', () => {
  test('should close first form when Approve is clicked on a second row', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-133-single-form-open-at-a-time.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-133-single-form-open-at-a-time.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    // Must have at least 2 rows
    const approveButtons = dashboard.pendingRequestsDataRows.locator('button[aria-expanded]');
    const buttonCount = await approveButtons.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-133-single-form-open-at-a-time.spec-14', async () => expect(buttonCount).toBeGreaterThanOrEqual(2));

    const firstApprove = approveButtons.nth(0);
    const secondApprove = approveButtons.nth(1);

    // Open form on first row
    await recordEvidence('action-click-LIMAS-SUD-133-single-form-open-at-a-time.spec-20', async () => firstApprove.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-133-single-form-open-at-a-time.spec-21', async () => expect(firstApprove).toHaveText('Close'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-133-single-form-open-at-a-time.spec-22', async () => expect(dashboard.approveFormLicenseAssignment).toBeVisible());

    // Open form on second row — should close first and open on second
    await recordEvidence('action-click-LIMAS-SUD-133-single-form-open-at-a-time.spec-25', async () => secondApprove.click());

    await recordEvidence('assert-toHaveText-LIMAS-SUD-133-single-form-open-at-a-time.spec-27', async () => expect(firstApprove).toHaveText('Approve'));
    await recordEvidence('assert-toHaveText-LIMAS-SUD-133-single-form-open-at-a-time.spec-28', async () => expect(secondApprove).toHaveText('Close'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-133-single-form-open-at-a-time.spec-29', async () => expect(dashboard.approveFormLicenseAssignment).toBeVisible());
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-133-single-form-open-at-a-time.spec-30', async () => expect(dashboard.approveFormLicenseAssignment).toHaveCount(1));

    // Close the form
    await recordEvidence('action-click-LIMAS-SUD-133-single-form-open-at-a-time.spec-33', async () => secondApprove.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-133-single-form-open-at-a-time.spec-34', async () => expect(secondApprove).toHaveText('Approve'));
  });
});