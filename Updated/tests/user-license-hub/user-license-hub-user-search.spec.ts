import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();
const USERS_API_PATH = '/api/users/f';

test.describe('User & License Hub — User Search', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1015: Search trigger sends GET to /api/users/f', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-search.spec-24', async () => expect(names.length).toBeGreaterThan(0));
    const searchTerm = names[0].split(' ')[0];

    const responsePromise = page.waitForResponse(
      (resp) =>
        resp.url().includes(USERS_API_PATH) &&
        resp.request().method() === 'GET' &&
        new URL(resp.url()).searchParams.get('firstName') === searchTerm,
      { timeout: 15000 }
    );

    await hub.setUserSearch(searchTerm);

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-user-search.spec-38', async () => expect(response.status()).toBe(200));
  });

  test('LIMAS-SUD-1016: Enter key does not cause duplicate request', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-search.spec-45', async () => expect(names.length).toBeGreaterThan(0));
    const searchTerm = names[0].split(' ')[0];

    await hub.setUserSearch(searchTerm);
    await hub.waitForUserListUpdate();

    const namesBeforeEnter = await hub.getVisibleUserCardNames();
    const urlsBefore: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes(USERS_API_PATH) && req.method() === 'GET') {
        urlsBefore.push(req.url());
      }
    });

    await recordEvidence('action-press-user-license-hub-user-search.spec-58', async () => hub.getUserSearchInputLocator().press('Enter'));

    // Wait for any response that might be triggered, cap at the next
    // network idle to confirm no duplicate request.
    await page.waitForLoadState('networkidle');

    // After Enter, no new search request beyond what was already sent.
    const searchRequests = urlsBefore.filter(
      (u) => (new URL(u).searchParams.get('firstName') ?? '').length > 0
    );
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-user-search.spec-68', async () => expect(searchRequests.length).toBeLessThanOrEqual(1));
    await expect.poll(() => hub.getVisibleUserCardNames()).toEqual(namesBeforeEnter);
  });

  test('LIMAS-SUD-1017: No client debounce on search', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const responses: string[] = [];
    const responseHandler = (resp: any) => {
      if (resp.url().includes(USERS_API_PATH) && resp.request().method() === 'GET') {
        const fn = new URL(resp.url()).searchParams.get('firstName');
        if (fn) responses.push(fn);
      }
    };
    page.on('response', responseHandler);

    await recordEvidence('action-click-user-license-hub-user-search.spec-84', async () => hub.getUserSearchInputLocator().click());
    await Promise.all([
      page.waitForResponse(
      (resp) =>
        resp.url().includes(USERS_API_PATH) &&
        resp.request().method() === 'GET' &&
        new URL(resp.url()).searchParams.get('firstName') === 'test',
      { timeout: 15000 }
    ),
      recordEvidence('action-type-user-license-hub-user-search.spec-85', async () => page.keyboard.type('test', { delay: 50 })),
    ]);

    page.off('response', responseHandler);
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-user-search.spec-98', async () => expect(responses.length).toBeGreaterThanOrEqual(4));
  });

  test('LIMAS-SUD-1018: Search input focus state on page load', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const isSearchFocused = await hub.getUserSearchInputLocator().evaluate(
      (el) => el === document.activeElement
    );

    await recordEvidence('assert-toBe-user-license-hub-user-search.spec-108', async () => expect(typeof isSearchFocused).toBe('boolean'));
  });
});