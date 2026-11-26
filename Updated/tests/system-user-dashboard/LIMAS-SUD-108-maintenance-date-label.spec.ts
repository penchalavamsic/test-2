import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-108: Maintenance Date label', () => {
  test('should show Maintenance Date label after Profile selection', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-108-maintenance-date-label.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-108-maintenance-date-label.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-108-maintenance-date-label.spec-12', async () => approveButton.click());

    // Select User Group
    await recordEvidence('action-click-LIMAS-SUD-108-maintenance-date-label.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-108-maintenance-date-label.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    // Select Profile
    await recordEvidence('action-click-LIMAS-SUD-108-maintenance-date-label.spec-19', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-108-maintenance-date-label.spec-20', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    // Maintenance Date label should be visible after Profile selection
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-108-maintenance-date-label.spec-23', async () => expect(dashboard.approveFormMaintenanceDateLabel).toBeVisible());

    // Close form
    await recordEvidence('action-click-LIMAS-SUD-108-maintenance-date-label.spec-26', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-108-maintenance-date-label.spec-27', async () => expect(approveButton).toHaveText('Approve'));
  });
});