import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-222: should have zero Delete buttons in the processed history view', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const count = await dashboard.deleteButtons.count();
    await recordEvidence('assert-toBe-LIMAS-SUD-222-processed-record-no-delete-button.spec-12', async () => expect(count).toBe(0));
  });
});