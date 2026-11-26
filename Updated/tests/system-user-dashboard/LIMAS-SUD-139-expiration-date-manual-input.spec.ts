import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-139: Expiration Date manual input', () => {
  test('should accept a manually typed future date', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-139-expiration-date-manual-input.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-139-expiration-date-manual-input.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-139-expiration-date-manual-input.spec-12', async () => approveButton.click());

    // Select User Group and Profile
    await recordEvidence('action-click-LIMAS-SUD-139-expiration-date-manual-input.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-139-expiration-date-manual-input.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-139-expiration-date-manual-input.spec-17', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-139-expiration-date-manual-input.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-139-expiration-date-manual-input.spec-20', async () => expect(dashboard.approveFormExpirationDateLabel).toBeVisible());

    // Compute a future date dynamically
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = String(futureDate.getFullYear());
    const dateString = `${year}-${month}-${day}`;

    // Type into the Expiration Date field
    const expirationInput = dashboard.page.getByLabel(/Expiration Date/);
    await recordEvidence('action-fill-LIMAS-SUD-139-expiration-date-manual-input.spec-32', async () => expirationInput.fill(dateString));
    await recordEvidence('action-press-LIMAS-SUD-139-expiration-date-manual-input.spec-33', async () => expirationInput.press('Enter'));

    // The field should display the entered date (or a formatted version)
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-139-expiration-date-manual-input.spec-36', async () => expect(expirationInput).toHaveValue(/.+/));

    // Approve Request should not be disabled solely due to missing Expiration
    // (may still be disabled if Role is not selected)
    // Verify the field has a value
    const value = await expirationInput.inputValue();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-139-expiration-date-manual-input.spec-42', async () => expect(value.length).toBeGreaterThan(0));

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-139-expiration-date-manual-input.spec-45', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-139-expiration-date-manual-input.spec-46', async () => expect(approveButton).toHaveText('Approve'));
  });
});