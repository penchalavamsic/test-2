import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-168: should show "Pending License Requests" heading (level 3) after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-168-processed-section-heading.spec-9', async () => dashboard.licenseHistorySwitch.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-168-processed-section-heading.spec-11', async () => expect(dashboard.pendingSectionHeading).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-168-processed-section-heading.spec-12', async () => expect(dashboard.pendingSectionHeading).toHaveText('Pending License Requests'));
  });
});