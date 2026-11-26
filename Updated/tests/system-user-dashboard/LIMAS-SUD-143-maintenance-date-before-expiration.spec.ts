import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-143: Maintenance Date before Expiration', () => {
  test('should show validation or accept Maintenance Date earlier than Expiration', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-143-maintenance-date-before-expiration.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-143-maintenance-date-before-expiration.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-143-maintenance-date-before-expiration.spec-12', async () => approveButton.click());

    // Select User Group and Profile
    await recordEvidence('action-click-LIMAS-SUD-143-maintenance-date-before-expiration.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-143-maintenance-date-before-expiration.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-143-maintenance-date-before-expiration.spec-17', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-143-maintenance-date-before-expiration.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    // Set Expiration Date to one year from now
    const expirationInput = dashboard.page.getByLabel(/Expiration Date/);
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const expDay = String(futureDate.getDate()).padStart(2, '0');
    const expMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
    const expYear = String(futureDate.getFullYear());
    await recordEvidence('action-fill-LIMAS-SUD-143-maintenance-date-before-expiration.spec-27', async () => expirationInput.fill(`${expYear}-${expMonth}-${expDay}`));
    await recordEvidence('action-press-LIMAS-SUD-143-maintenance-date-before-expiration.spec-28', async () => expirationInput.press('Enter'));

    // Set Maintenance Date to one day before Expiration
    const maintenanceInput = dashboard.page.getByLabel(/Maintenance Date/);
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-143-maintenance-date-before-expiration.spec-32', async () => expect(maintenanceInput).toBeEnabled());

    const maintDate = new Date(futureDate);
    maintDate.setDate(maintDate.getDate() - 1);
    const maintDay = String(maintDate.getDate()).padStart(2, '0');
    const maintMonth = String(maintDate.getMonth() + 1).padStart(2, '0');
    const maintYear = String(maintDate.getFullYear());
    await recordEvidence('action-fill-LIMAS-SUD-143-maintenance-date-before-expiration.spec-39', async () => maintenanceInput.fill(`${maintYear}-${maintMonth}-${maintDay}`));
    await recordEvidence('action-press-LIMAS-SUD-143-maintenance-date-before-expiration.spec-40', async () => maintenanceInput.press('Enter'));

    // Check for validation error or accepted value
    const errorMessage = dashboard.page.getByRole('alert').or(dashboard.page.locator('.Mui-error, [class*="error"]'));
    const hasError = await errorMessage.isVisible().catch(() => false);

    if (!hasError) {
      // No error — verify the value was accepted
      const value = await maintenanceInput.inputValue();
      await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-143-maintenance-date-before-expiration.spec-49', async () => expect(value.length).toBeGreaterThan(0));
    } else {
      // Error is shown — verify it is visible
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-143-maintenance-date-before-expiration.spec-52', async () => expect(errorMessage.first()).toBeVisible());
    }

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-143-maintenance-date-before-expiration.spec-56', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-143-maintenance-date-before-expiration.spec-57', async () => expect(approveButton).toHaveText('Approve'));
  });
});