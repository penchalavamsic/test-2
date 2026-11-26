import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-138: Expiration Date calendar open', () => {
  test('should open calendar picker when Expiration Date field is clicked', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-138-expiration-date-calendar-open.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-138-expiration-date-calendar-open.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-138-expiration-date-calendar-open.spec-12', async () => approveButton.click());

    // Select User Group and Profile to reveal Expiration Date
    await recordEvidence('action-click-LIMAS-SUD-138-expiration-date-calendar-open.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-138-expiration-date-calendar-open.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-138-expiration-date-calendar-open.spec-17', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-138-expiration-date-calendar-open.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-138-expiration-date-calendar-open.spec-20', async () => expect(dashboard.approveFormExpirationDateLabel).toBeVisible());

    // Click the Expiration Date input — expect calendar popup
    const expirationInput = dashboard.page.getByLabel(/Expiration Date/);
    await recordEvidence('action-click-LIMAS-SUD-138-expiration-date-calendar-open.spec-24', async () => expirationInput.click());

    // MUI date picker or calendar dialog should appear
    const calendarPopup = dashboard.page.locator('[role="dialog"], .MuiPickersPopper-root, [role="grid"]').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-138-expiration-date-calendar-open.spec-28', async () => expect(calendarPopup).toBeVisible({ timeout: 3000 }));

    // Close calendar by pressing Escape
    await recordEvidence('action-press-LIMAS-SUD-138-expiration-date-calendar-open.spec-31', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-138-expiration-date-calendar-open.spec-32', async () => expect(calendarPopup).not.toBeVisible());

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-138-expiration-date-calendar-open.spec-35', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-138-expiration-date-calendar-open.spec-36', async () => expect(approveButton).toHaveText('Approve'));
  });
});