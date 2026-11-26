import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-249: should append new record cards after incremental load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const initialCardCount = await dashboard.getProcessedCardCount();

    await dashboard.triggerSingleIncrementalLoad();

    const updatedCardCount = await dashboard.getProcessedCardCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-249-incremental-records-appended.spec-16', async () => expect(updatedCardCount).toBeGreaterThan(initialCardCount));
  });
});