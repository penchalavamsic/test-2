import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-107: Expiration Date required indicator', () => {
  test('should show asterisk on Expiration Date label', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-107-expiration-date-required-indicator.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-107-expiration-date-required-indicator.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-107-expiration-date-required-indicator.spec-12', async () => approveButton.click());

    // Select User Group
    await recordEvidence('action-click-LIMAS-SUD-107-expiration-date-required-indicator.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-107-expiration-date-required-indicator.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    // Select Profile
    await recordEvidence('action-click-LIMAS-SUD-107-expiration-date-required-indicator.spec-19', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-107-expiration-date-required-indicator.spec-20', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    await recordEvidence('assert-toHaveText-LIMAS-SUD-107-expiration-date-required-indicator.spec-22', async () => expect(dashboard.approveFormExpirationDateLabel).toHaveText(/Expiration Date\*/));

    // Close form
    await recordEvidence('action-click-LIMAS-SUD-107-expiration-date-required-indicator.spec-25', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-107-expiration-date-required-indicator.spec-26', async () => expect(approveButton).toHaveText('Approve'));
  });
});