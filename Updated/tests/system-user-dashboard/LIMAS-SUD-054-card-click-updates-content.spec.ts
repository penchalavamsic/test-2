import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-054: should update content section heading after clicking another summary card', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Initially Pending License Requests heading is visible
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-054-card-click-updates-content.spec-10', async () => expect(dashboard.pendingSectionHeading).toBeVisible());

    // Click Expiring Licenses card
    await recordEvidence('action-click-LIMAS-SUD-054-card-click-updates-content.spec-13', async () => dashboard.expiringLicensesCard.click());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-054-card-click-updates-content.spec-14', async () => expect(dashboard.expiringLicensesCard).toHaveAttribute('aria-pressed', 'true'));

    // The Pending License Requests heading should no longer be visible
    // Instead, the Expiring Licenses heading should appear
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-054-card-click-updates-content.spec-18', async () => expect(dashboard.pendingSectionHeading).not.toBeVisible());

    // Click back to Pending License Requests
    await recordEvidence('action-click-LIMAS-SUD-054-card-click-updates-content.spec-21', async () => dashboard.pendingLicenseRequestsCard.click());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-054-card-click-updates-content.spec-22', async () => expect(dashboard.pendingLicenseRequestsCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-054-card-click-updates-content.spec-23', async () => expect(dashboard.pendingSectionHeading).toBeVisible());
  });
});