import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-141: Expiration Date future selection', () => {
  test('should accept a future date selected from the calendar picker', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-141-expiration-date-future-selection.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-12', async () => approveButton.click());

    // Select User Group and Profile
    await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-17', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-141-expiration-date-future-selection.spec-20', async () => expect(dashboard.approveFormExpirationDateLabel).toBeVisible());

    // Open calendar picker
    const expirationInput = dashboard.page.getByLabel(/Expiration Date/);
    await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-24', async () => expirationInput.click());

    // Look for a calendar dialog/grid
    const calendarDialog = dashboard.page.locator('[role="dialog"]');
    const calendarGrid = dashboard.page.locator('[role="grid"]');
    const calendarPopup = calendarDialog.or(calendarGrid).first();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-141-expiration-date-future-selection.spec-31', async () => expect(calendarPopup).toBeVisible({ timeout: 3000 }));

    // Select a future date: click a day cell that is not disabled
    const dayCell = calendarPopup.locator('button:not([disabled])').first();
    if (await dayCell.isVisible()) {
      await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-36', async () => dayCell.click());
    }

    // Calendar should close and date should be populated
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-141-expiration-date-future-selection.spec-40', async () => expect(calendarPopup).not.toBeVisible({ timeout: 3000 }));

    const value = await expirationInput.inputValue();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-141-expiration-date-future-selection.spec-43', async () => expect(value.length).toBeGreaterThan(0));

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-141-expiration-date-future-selection.spec-46', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-141-expiration-date-future-selection.spec-47', async () => expect(approveButton).toHaveText('Approve'));
  });
});