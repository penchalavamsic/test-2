import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();
const USERS_API_PATH = '/api/users/f';

test.describe('User & License Hub — Network', () => {
  test('LIMAS-SUD-969: Navigation triggers GET to /api/users/f', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    // Finish the dashboard request before observing the Hub request to the same API.
    await page.waitForLoadState('networkidle');

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes(USERS_API_PATH) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-network.spec-25', async () => expect(response.status()).toBe(200));
  });

  test('LIMAS-SUD-970: User API request includes page, size, and groupids', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    // Finish the dashboard request before observing the Hub request to the same API.
    await page.waitForLoadState('networkidle');

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes(USERS_API_PATH) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    const response = await responsePromise;
    const url = new URL(response.url());
    await recordEvidence('assert-toBe-user-license-hub-network.spec-44', async () => expect(url.searchParams.get('page')).toBe('0'));
    await recordEvidence('assert-toBe-user-license-hub-network.spec-45', async () => expect(url.searchParams.get('size')).toBe('20'));
    await recordEvidence('assert-toBe-user-license-hub-network.spec-46', async () => expect(url.searchParams.has('groupids')).toBe(true));
  });

  test('LIMAS-SUD-971: User API response is 200 with JSON content type', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    // Finish the dashboard request before observing the Hub request to the same API.
    await page.waitForLoadState('networkidle');

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes(USERS_API_PATH) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-network.spec-64', async () => expect(response.status()).toBe(200));
    const contentType = response.headers()['content-type'] ?? '';
    await recordEvidence('assert-toContain-user-license-hub-network.spec-66', async () => expect(contentType).toContain('application/json'));
  });
});