import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-055: should display the Pending License Requests section heading at level 3', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-055-pending-section-heading.spec-9', async () => expect(dashboard.pendingSectionHeading).toBeVisible());
  });
});