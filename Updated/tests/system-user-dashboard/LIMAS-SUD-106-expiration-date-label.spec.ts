import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-106: Expiration Date label', () => {
  test('should show Expiration Date* label after Profile selection', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-106-expiration-date-label.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-106-expiration-date-label.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-106-expiration-date-label.spec-12', async () => approveButton.click());

    // Expiration Date should not be visible before Profile selection
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-106-expiration-date-label.spec-15', async () => expect(dashboard.approveFormExpirationDateLabel).not.toBeVisible());

    // Select User Group
    await recordEvidence('action-click-LIMAS-SUD-106-expiration-date-label.spec-18', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-106-expiration-date-label.spec-19', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    // Select Profile
    await recordEvidence('action-click-LIMAS-SUD-106-expiration-date-label.spec-22', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-106-expiration-date-label.spec-23', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    // Expiration Date* should now be visible
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-106-expiration-date-label.spec-26', async () => expect(dashboard.approveFormExpirationDateLabel).toBeVisible());

    // Close form
    await recordEvidence('action-click-LIMAS-SUD-106-expiration-date-label.spec-29', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-106-expiration-date-label.spec-30', async () => expect(approveButton).toHaveText('Approve'));
  });
});