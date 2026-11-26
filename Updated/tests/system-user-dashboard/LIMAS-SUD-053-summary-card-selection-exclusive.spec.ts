import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-053: should enforce exclusive summary card selection', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Verify exactly one card is pressed on initial load
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-10', async () => expect(dashboard.pendingLicenseRequestsCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-11', async () => expect(dashboard.expiringLicensesCard).toHaveAttribute('aria-pressed', 'false'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-12', async () => expect(dashboard.floatingConfigsCard).toHaveAttribute('aria-pressed', 'false'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-13', async () => expect(dashboard.floatingLicensesCard).toHaveAttribute('aria-pressed', 'false'));

    // Click another card
    await recordEvidence('action-click-LIMAS-SUD-053-summary-card-selection-exclusive.spec-16', async () => dashboard.expiringLicensesCard.click());

    // Now Expiring Licenses should be pressed, Pending should not
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-19', async () => expect(dashboard.expiringLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-20', async () => expect(dashboard.pendingLicenseRequestsCard).toHaveAttribute('aria-pressed', 'false'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-21', async () => expect(dashboard.floatingConfigsCard).toHaveAttribute('aria-pressed', 'false'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-22', async () => expect(dashboard.floatingLicensesCard).toHaveAttribute('aria-pressed', 'false'));

    // Click Pending again to restore original state
    await recordEvidence('action-click-LIMAS-SUD-053-summary-card-selection-exclusive.spec-25', async () => dashboard.pendingLicenseRequestsCard.click());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-26', async () => expect(dashboard.pendingLicenseRequestsCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-053-summary-card-selection-exclusive.spec-27', async () => expect(dashboard.expiringLicensesCard).toHaveAttribute('aria-pressed', 'false'));
  });
});