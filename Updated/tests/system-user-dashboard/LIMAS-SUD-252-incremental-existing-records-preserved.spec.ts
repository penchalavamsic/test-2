import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-252: should preserve existing records after incremental load appends new data', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const firstUserLabel = page.getByText('User').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-252-incremental-existing-records-preserved.spec-12', async () => expect(firstUserLabel).toBeVisible());
    const initialText = await firstUserLabel.textContent();

    await dashboard.triggerSingleIncrementalLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-252-incremental-existing-records-preserved.spec-17', async () => expect(firstUserLabel).toBeVisible());
    const preservedText = await firstUserLabel.textContent();
    await recordEvidence('assert-toBe-LIMAS-SUD-252-incremental-existing-records-preserved.spec-19', async () => expect(preservedText).toBe(initialText));
  });
});