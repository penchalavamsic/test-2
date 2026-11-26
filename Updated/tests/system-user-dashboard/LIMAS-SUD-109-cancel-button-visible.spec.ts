import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-109: Cancel button visible', () => {
  test('should show Cancel button in the inline form at all times', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-109-cancel-button-visible.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-109-cancel-button-visible.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-109-cancel-button-visible.spec-12', async () => approveButton.click());

    // Cancel button visible when form opens
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-109-cancel-button-visible.spec-15', async () => expect(dashboard.approveFormCancelButton).toBeVisible());

    // Fill a field and verify Cancel still visible
    await recordEvidence('action-click-LIMAS-SUD-109-cancel-button-visible.spec-18', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-109-cancel-button-visible.spec-19', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-109-cancel-button-visible.spec-20', async () => expect(dashboard.approveFormCancelButton).toBeVisible());

    // Close form via Cancel
    await recordEvidence('action-click-LIMAS-SUD-109-cancel-button-visible.spec-23', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-109-cancel-button-visible.spec-24', async () => expect(approveButton).toHaveText('Approve'));
  });
});