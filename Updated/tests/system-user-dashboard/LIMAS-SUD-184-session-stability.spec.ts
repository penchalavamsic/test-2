import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-184: should maintain session stability after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const urlBefore = page.url();

    await recordEvidence('action-click-LIMAS-SUD-184-session-stability.spec-11', async () => dashboard.licenseHistorySwitch.click());

    // Verify heading remains
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-184-session-stability.spec-14', async () => expect(dashboard.heading).toBeVisible());

    // Verify pending license requests card still visible
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-184-session-stability.spec-17', async () => expect(dashboard.pendingLicenseRequestsCard).toBeVisible());

    // Verify processed subtitle visible
    const processedSubtitle = page.getByText('Processed License Requests — approved or deleted.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-184-session-stability.spec-21', async () => expect(processedSubtitle).toBeVisible());

    // Verify items rendered
    const userHeadings = page.getByText('User');
    const headingCount = await userHeadings.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-184-session-stability.spec-26', async () => expect(headingCount).toBeGreaterThanOrEqual(1));

    // URL should be unchanged
    const urlAfter = page.url();
    await recordEvidence('assert-toBe-LIMAS-SUD-184-session-stability.spec-30', async () => expect(urlAfter).toBe(urlBefore));
  });
});