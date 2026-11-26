import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-135: User Group keyboard selection', () => {
  test('should navigate and select User Group options via arrow keys and Enter', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-135-user-group-keyboard-selection.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-135-user-group-keyboard-selection.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-135-user-group-keyboard-selection.spec-12', async () => approveButton.click());

    // Open User Group listbox
    await recordEvidence('action-click-LIMAS-SUD-135-user-group-keyboard-selection.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-135-user-group-keyboard-selection.spec-16', async () => expect(dashboard.approveFormListbox).toBeVisible());

    const options = dashboard.approveFormListbox.getByRole('option');
    const optionCount = await options.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-135-user-group-keyboard-selection.spec-20', async () => expect(optionCount).toBeGreaterThanOrEqual(1));

    // ArrowDown to next option
    await recordEvidence('action-press-LIMAS-SUD-135-user-group-keyboard-selection.spec-23', async () => page.keyboard.press('ArrowDown'));

    // Read the text of what should now be the highlighted option
    const selectedOption = options.nth(1 < optionCount ? 1 : 0);
    const optionText = await selectedOption.textContent();

    // Press Enter to select
    await recordEvidence('action-press-LIMAS-SUD-135-user-group-keyboard-selection.spec-30', async () => page.keyboard.press('Enter'));

    // Listbox should close and combobox should show selected value
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-135-user-group-keyboard-selection.spec-33', async () => expect(dashboard.approveFormListbox).not.toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-135-user-group-keyboard-selection.spec-34', async () => expect(dashboard.approveFormUserGroupCombobox).not.toHaveText('Select User Group'));
    await recordEvidence('assert-toContainText-LIMAS-SUD-135-user-group-keyboard-selection.spec-35', async () => expect(dashboard.approveFormUserGroupCombobox).toContainText(optionText ?? ''));

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-135-user-group-keyboard-selection.spec-38', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-135-user-group-keyboard-selection.spec-39', async () => expect(approveButton).toHaveText('Approve'));
  });
});