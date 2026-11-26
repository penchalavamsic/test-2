import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';

const FLICENSE_API_PATTERN = '**/limas/api/flicense/ex/**';

test.describe('System User Dashboard — Floating Licenses Network', () => {
  test('LIMAS-SUD-881: Floating Licenses card selection triggers GET request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.selectFloatingLicenses();
    const response = await responsePromise;
    await recordEvidence('assert-toBe-floating-licenses-network.spec-17', async () => expect(response.status()).toBe(200));
  });

  test('LIMAS-SUD-882: Request uses flicense endpoint with correct path structure', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.selectFloatingLicenses();
    const response = await responsePromise;
    const url = new URL(response.url());
    await recordEvidence('assert-toMatch-floating-licenses-network.spec-31', async () => expect(url.pathname).toMatch(/\/api\/flicense\/ex\/.+/));
    await recordEvidence('assert-toBe-floating-licenses-network.spec-32', async () => expect(url.searchParams.get('page')).toBe('0'));
    await recordEvidence('assert-toBe-floating-licenses-network.spec-33', async () => expect(url.searchParams.get('size')).toBe('5'));
  });

  test('LIMAS-SUD-883: Response is 200 with zero content-length (empty body)', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Prepare response wait BEFORE clicking, to avoid missing the request
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    // Switch away first so selection always triggers a fresh GET
    await recordEvidence('action-click-floating-licenses-network.spec-46', async () => dashboard.expiringLicensesCard.click());
    await page.waitForTimeout(300);
    await dashboard.selectFloatingLicenses();
    const response = await responsePromise;
    await recordEvidence('assert-toBe-floating-licenses-network.spec-50', async () => expect(response.status()).toBe(200));
    const contentLength = response.headers()['content-length'];
    await recordEvidence('assert-toBe-floating-licenses-network.spec-52', async () => expect(contentLength).toBe('0'));
  });

  test('LIMAS-SUD-884: Single GET request per card selection, no other methods', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Switch away from FL first to ensure a fresh request
    await recordEvidence('action-click-floating-licenses-network.spec-60', async () => dashboard.expiringLicensesCard.click());
    await page.waitForTimeout(500);

    let getCount = 0;
    let otherMethodCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flicense/')) {
        if (req.method() === 'GET') {
          getCount++;
        } else {
          otherMethodCount++;
        }
      }
    });

    // Prepare promise BEFORE the click that triggers the request
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.selectFloatingLicenses();
    await responsePromise;

    await recordEvidence('assert-toBe-floating-licenses-network.spec-83', async () => expect(getCount).toBe(1));
    await recordEvidence('assert-toBe-floating-licenses-network.spec-84', async () => expect(otherMethodCount).toBe(0));
  });
});