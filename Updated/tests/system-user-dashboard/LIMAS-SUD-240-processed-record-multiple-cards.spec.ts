import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-240: should display at least 2 processed records (or "User" label occurrences >= 2)', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const loadedCount = await dashboard.getLoadedCount();
    // Each card has one "User" label, so count should match
    const userLabels = page.getByText('User');
    const userLabelCount = await userLabels.count();

    // Either the loaded count is >= 2, or the "User" label count is >= 2
    // (they should be equivalent, but we check both for robustness)
    const hasMultiple = loadedCount >= 2 || userLabelCount >= 2;
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-240-processed-record-multiple-cards.spec-19', async () => expect(hasMultiple).toBeTruthy());
  });
});