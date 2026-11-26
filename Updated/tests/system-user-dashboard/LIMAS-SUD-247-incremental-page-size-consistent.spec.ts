import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request Incremental Loading', () => {
  test('LIMAS-SUD-247: should use the same page size in initial and next-page API calls', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    let initialSize: string | null = null;
    let nextPageSize: string | null = null;

    const initialResponsePromise = page.waitForResponse(
      (response) => {
        if (
          response.url().includes('/limas/api/request/processed') &&
          response.url().includes('page=0') &&
          response.request().method() === 'GET'
        ) {
          const url = new URL(response.url());
          initialSize = url.searchParams.get('size');
          return true;
        }
        return false;
      }
    );

    await recordEvidence('action-click-LIMAS-SUD-247-incremental-page-size-consistent.spec-27', async () => dashboard.licenseHistorySwitch.click());
    await initialResponsePromise;
    await recordEvidence('assert-toBeNull-LIMAS-SUD-247-incremental-page-size-consistent.spec-29', async () => expect(initialSize).not.toBeNull());

    const nextPageResponsePromise = page.waitForResponse(
      (response) => {
        if (
          response.url().includes('/limas/api/request/processed') &&
          !response.url().includes('page=0') &&
          response.request().method() === 'GET'
        ) {
          const url = new URL(response.url());
          nextPageSize = url.searchParams.get('size');
          return true;
        }
        return false;
      }
    );

    await dashboard.triggerSingleIncrementalLoad();
    await nextPageResponsePromise;

    await recordEvidence('assert-toBeNull-LIMAS-SUD-247-incremental-page-size-consistent.spec-49', async () => expect(nextPageSize).not.toBeNull());
    await recordEvidence('assert-toBe-LIMAS-SUD-247-incremental-page-size-consistent.spec-50', async () => expect(nextPageSize).toBe(initialSize));
  });
});