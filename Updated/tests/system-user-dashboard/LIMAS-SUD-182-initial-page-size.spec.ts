import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-182: should request size 20 in initial processed API call', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    let capturedSizeParam: string | null = null;

    const responsePromise = page.waitForResponse(
      (response) => {
        if (
          response.url().includes('/limas/api/request/processed') &&
          response.request().method() === 'GET'
        ) {
          const url = new URL(response.url());
          capturedSizeParam = url.searchParams.get('size');
          return true;
        }
        return false;
      }
    );

    await recordEvidence('action-click-LIMAS-SUD-182-initial-page-size.spec-25', async () => dashboard.licenseHistorySwitch.click());
    await responsePromise;

    await recordEvidence('assert-toBe-LIMAS-SUD-182-initial-page-size.spec-28', async () => expect(capturedSizeParam).toBe('20'));
  });
});