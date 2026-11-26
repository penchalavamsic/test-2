import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-048: should have Pending License Requests card selected by default', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-048-pending-card-selected-default.spec-9', async () => expect(dashboard.pendingLicenseRequestsCard).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-048-pending-card-selected-default.spec-10', async () => expect(dashboard.pendingLicenseRequestsCard).toHaveAttribute('aria-pressed', 'true'));
  });
});