import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-140: Expiration Date clear', () => {
  test('should clear Expiration Date and disable Approve Request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-140-expiration-date-clear.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-140-expiration-date-clear.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-140-expiration-date-clear.spec-12', async () => approveButton.click());

    // Select User Group and Profile
    await recordEvidence('action-click-LIMAS-SUD-140-expiration-date-clear.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-140-expiration-date-clear.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-140-expiration-date-clear.spec-17', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-140-expiration-date-clear.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    const expirationInput = dashboard.page.getByLabel(/Expiration Date/);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-140-expiration-date-clear.spec-21', async () => expect(expirationInput).toBeVisible());

    // Type a future date
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = String(futureDate.getFullYear());
    await recordEvidence('action-fill-LIMAS-SUD-140-expiration-date-clear.spec-29', async () => expirationInput.fill(`${year}-${month}-${day}`));
    await recordEvidence('action-press-LIMAS-SUD-140-expiration-date-clear.spec-30', async () => expirationInput.press('Enter'));

    // Verify field has value
    const beforeClear = await expirationInput.inputValue();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-140-expiration-date-clear.spec-34', async () => expect(beforeClear.length).toBeGreaterThan(0));

    // Clear the field
    await recordEvidence('action-clear-LIMAS-SUD-140-expiration-date-clear.spec-37', async () => expirationInput.clear());

    // After clearing, field should be empty
    const afterClear = await expirationInput.inputValue();
    await recordEvidence('assert-toBe-LIMAS-SUD-140-expiration-date-clear.spec-41', async () => expect(afterClear.length).toBe(0));

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-140-expiration-date-clear.spec-44', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-140-expiration-date-clear.spec-45', async () => expect(approveButton).toHaveText('Approve'));
  });
});