import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-211: should render at least one card container with "User" label after history load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const userLabels = page.getByText('User');
    const count = await userLabels.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-211-processed-record-card-container.spec-13', async () => expect(count).toBeGreaterThanOrEqual(1));
  });
});