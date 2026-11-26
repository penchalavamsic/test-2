import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-134: Selected row identifiability', () => {
  test('should keep the row with open form visually distinct', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-134-selected-row-identifiability.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-134-selected-row-identifiability.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButtons = dashboard.pendingRequestsDataRows.locator('button[aria-expanded]');
    const buttonCount = await approveButtons.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-134-selected-row-identifiability.spec-13', async () => expect(buttonCount).toBeGreaterThanOrEqual(2));

    const firstApprove = approveButtons.nth(0);
    await recordEvidence('action-click-LIMAS-SUD-134-selected-row-identifiability.spec-16', async () => firstApprove.click());

    // The selected row's button is now "Close" with expanded state
    await recordEvidence('assert-toHaveText-LIMAS-SUD-134-selected-row-identifiability.spec-19', async () => expect(firstApprove).toHaveText('Close'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-134-selected-row-identifiability.spec-20', async () => expect(firstApprove).toHaveAttribute('aria-expanded', 'true'));

    // Only ONE button should read "Close"
    const closeButtons = dashboard.page.getByRole('button', { name: 'Close' });
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-134-selected-row-identifiability.spec-24', async () => expect(closeButtons).toHaveCount(1));

    // At least one other row still reads "Approve"
    await recordEvidence('assert-toHaveText-LIMAS-SUD-134-selected-row-identifiability.spec-27', async () => expect(approveButtons.nth(1)).toHaveText('Approve'));

    // Close the form
    await recordEvidence('action-click-LIMAS-SUD-134-selected-row-identifiability.spec-30', async () => firstApprove.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-134-selected-row-identifiability.spec-31', async () => expect(firstApprove).toHaveText('Approve'));
  });
});