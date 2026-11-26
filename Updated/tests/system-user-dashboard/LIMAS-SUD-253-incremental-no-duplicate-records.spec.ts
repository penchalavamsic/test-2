import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-253: should have no duplicate processed records after incremental load', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const pages: Array<Promise<{ content: Array<{ id: number | string }> }>> = [];
    const collect = (response: import('@playwright/test').Response) => {
      if (response.url().includes('/api/request/processed') && response.request().method() === 'GET' && response.status() === 200) pages.push(response.json());
    };
    page.on('response', collect);
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.triggerSingleIncrementalLoad();

    page.off('response', collect);
    const records = (await Promise.all(pages)).flatMap(p => p.content);
    await recordEvidence('assert-response-identities-present', () => expect(records.length).toBeGreaterThan(0));
    const noDuplicates = await dashboard.verifyNoDuplicateProcessedRecords(records.map(record => record.id));
    await recordEvidence('assert-toBe-LIMAS-SUD-253-incremental-no-duplicate-records.spec-14', async () => expect(noDuplicates).toBe(true));
  });
});