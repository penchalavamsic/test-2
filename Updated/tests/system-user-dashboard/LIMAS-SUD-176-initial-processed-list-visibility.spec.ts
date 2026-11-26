import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-176: should render at least one processed item after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-176-initial-processed-list-visibility.spec-9', async () => dashboard.licenseHistorySwitch.click());

    // Wait for the processed subtitle to confirm the view has switched
    const processedSubtitle = page.getByText('Processed License Requests — approved or deleted.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-176-initial-processed-list-visibility.spec-13', async () => expect(processedSubtitle).toBeVisible());

    // Verify at least one processed item card is rendered
    // Items use divs with User/Feature/Hardware sections
    const userHeadings = page.getByText('User');
    const count = await userHeadings.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-176-initial-processed-list-visibility.spec-19', async () => expect(count).toBeGreaterThanOrEqual(1));
  });
});