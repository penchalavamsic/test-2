import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-246: should request a page number greater than zero in the next-page API call', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    let capturedPageParam: string | null = null;

    const responsePromise = page.waitForResponse(
      (response) => {
        if (
          response.url().includes('/limas/api/request/processed') &&
          response.request().method() === 'GET'
        ) {
          const url = new URL(response.url());
          const pageVal = url.searchParams.get('page');
          if (pageVal !== '0') {
            capturedPageParam = pageVal;
            return true;
          }
        }
        return false;
      }
    );

    await dashboard.triggerSingleIncrementalLoad();
    await responsePromise;

    await recordEvidence('assert-toBeNull-LIMAS-SUD-246-incremental-page-number-increment.spec-33', async () => expect(capturedPageParam).not.toBeNull());
    const pageNum = parseInt(capturedPageParam!, 10);
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-246-incremental-page-number-increment.spec-35', async () => expect(pageNum).toBeGreaterThan(0));
  });
});