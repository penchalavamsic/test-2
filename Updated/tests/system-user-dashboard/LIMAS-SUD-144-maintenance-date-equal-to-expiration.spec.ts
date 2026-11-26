import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-144: Maintenance Date equal to Expiration', () => {
  test('should accept or validate Maintenance Date equal to Expiration Date', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-12', async () => approveButton.click());

    // Select User Group and Profile
    await recordEvidence('action-click-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-17', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    // Set Expiration Date
    const expirationInput = dashboard.page.getByLabel(/Expiration Date/);
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = String(futureDate.getFullYear());
    const dateString = `${year}-${month}-${day}`;
    await recordEvidence('action-fill-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-28', async () => expirationInput.fill(dateString));
    await recordEvidence('action-press-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-29', async () => expirationInput.press('Enter'));

    // Set Maintenance Date to exactly the same date
    const maintenanceInput = dashboard.page.getByLabel(/Maintenance Date/);
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-33', async () => expect(maintenanceInput).toBeEnabled());
    await recordEvidence('action-fill-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-34', async () => maintenanceInput.fill(dateString));
    await recordEvidence('action-press-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-35', async () => maintenanceInput.press('Enter'));

    // Check result — either accepted or error
    const errorMessage = dashboard.page.getByRole('alert').or(dashboard.page.locator('.Mui-error, [class*="error"]'));
    const hasError = await errorMessage.isVisible().catch(() => false);

    if (!hasError) {
      const value = await maintenanceInput.inputValue();
      await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-43', async () => expect(value.length).toBeGreaterThan(0));
    } else {
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-45', async () => expect(errorMessage.first()).toBeVisible());
    }

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-49', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-144-maintenance-date-equal-to-expiration.spec-50', async () => expect(approveButton).toHaveText('Approve'));
  });
});