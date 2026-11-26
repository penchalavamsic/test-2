import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-181: should request page 0 in initial processed API call', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    let capturedPageParam: string | null = null;

    const responsePromise = page.waitForResponse(
      (response) => {
        if (
          response.url().includes('/limas/api/request/processed') &&
          response.request().method() === 'GET'
        ) {
          const url = new URL(response.url());
          capturedPageParam = url.searchParams.get('page');
          return true;
        }
        return false;
      }
    );

    await recordEvidence('action-click-LIMAS-SUD-181-initial-page-number.spec-25', async () => dashboard.licenseHistorySwitch.click());
    await responsePromise;

    await recordEvidence('assert-toBe-LIMAS-SUD-181-initial-page-number.spec-28', async () => expect(capturedPageParam).toBe('0'));
  });
});