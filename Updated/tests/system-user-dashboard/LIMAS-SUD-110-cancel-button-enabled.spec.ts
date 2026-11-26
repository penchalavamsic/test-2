import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-110: Cancel button enabled', () => {
  test('should show Cancel button as enabled at all times', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-110-cancel-button-enabled.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-110-cancel-button-enabled.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-110-cancel-button-enabled.spec-12', async () => approveButton.click());

    // Cancel button should be enabled when form opens
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-110-cancel-button-enabled.spec-15', async () => expect(dashboard.approveFormCancelButton).toBeEnabled());

    // Fill a field and verify Cancel is still enabled
    await recordEvidence('action-click-LIMAS-SUD-110-cancel-button-enabled.spec-18', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-110-cancel-button-enabled.spec-19', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-110-cancel-button-enabled.spec-20', async () => expect(dashboard.approveFormCancelButton).toBeEnabled());

    // Close form via Cancel
    await recordEvidence('action-click-LIMAS-SUD-110-cancel-button-enabled.spec-23', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-110-cancel-button-enabled.spec-24', async () => expect(approveButton).toHaveText('Approve'));
  });
});