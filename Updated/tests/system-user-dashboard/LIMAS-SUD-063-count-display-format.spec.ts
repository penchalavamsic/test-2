import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-063: should display the loaded·total pending count format', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // The count display is in the format "{N} loaded·{M} total pending"
    const countText = page.getByText(/\d+\s*loaded[·•]\d+\s*total\s+pending/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-063-count-display-format.spec-11', async () => expect(countText).toBeVisible());
  });
});