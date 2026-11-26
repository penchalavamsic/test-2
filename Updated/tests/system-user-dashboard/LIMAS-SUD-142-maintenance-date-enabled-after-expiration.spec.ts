import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-142: Maintenance Date enabled after Expiration', () => {
  test('should enable Maintenance Date after Expiration Date is selected', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-12', async () => approveButton.click());

    // Select User Group and Profile
    await recordEvidence('action-click-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-17', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-20', async () => expect(dashboard.approveFormMaintenanceDateLabel).toBeVisible());

    // Maintenance Date should be disabled initially (before Expiration Date)
    const maintenanceInput = dashboard.page.getByLabel(/Maintenance Date/);
    await recordEvidence('assert-toBeDisabled-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-24', async () => expect(maintenanceInput).toBeDisabled());

    // Select Expiration Date
    const expirationInput = dashboard.page.getByLabel(/Expiration Date/);
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = String(futureDate.getFullYear());
    await recordEvidence('action-fill-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-33', async () => expirationInput.fill(`${year}-${month}-${day}`));
    await recordEvidence('action-press-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-34', async () => expirationInput.press('Enter'));

    // Maintenance Date should now be enabled
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-37', async () => expect(maintenanceInput).toBeEnabled());

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-40', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-142-maintenance-date-enabled-after-expiration.spec-41', async () => expect(approveButton).toHaveText('Approve'));
  });
});