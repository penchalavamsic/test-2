import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-180: should send GET processed API request on history activation', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Set up the response promise BEFORE clicking the switch
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/limas/api/request/processed') &&
        response.url().includes('page=0') &&
        response.url().includes('size=20') &&
        response.request().method() === 'GET'
    );

    await recordEvidence('action-click-LIMAS-SUD-180-initial-processed-api-request.spec-18', async () => dashboard.licenseHistorySwitch.click());

    const response = await responsePromise;
    await recordEvidence('assert-toBe-LIMAS-SUD-180-initial-processed-api-request.spec-21', async () => expect(response.status()).toBe(200));
  });
});