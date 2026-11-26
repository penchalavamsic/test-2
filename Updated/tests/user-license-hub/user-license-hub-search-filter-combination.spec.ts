import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();
const USERS_API_PATH = '/api/users/f';

test.describe('User & License Hub — Search & Filter Combination', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1034: Search within group filter sends both params', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const groups = await hub.getGroupOptionTexts();
    const populatedGroup = await hub.getFirstVisibleUserGroup();
    const targetGroup = groups.find((g) => g === populatedGroup);
    await recordEvidence('assert-toBeTruthy-user-license-hub-search-filter-combination.spec-26', async () => expect(targetGroup).toBeTruthy());

    await hub.selectGroupOption(targetGroup!);
    await hub.clickSelectButton();
    await hub.waitForUserListUpdate();

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-search-filter-combination.spec-33', async () => expect(names.length).toBeGreaterThan(0));
    const searchTerm = names[0].split(' ')[0];

    const responsePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        const gids = url.searchParams.get('groupids') ?? '';
        const fn = url.searchParams.get('firstName') ?? '';
        return gids.split(',').length === 1 && fn === searchTerm;
      },
      { timeout: 15000 }
    );

    await hub.setUserSearch(searchTerm);

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-search-filter-combination.spec-50', async () => expect(response.status()).toBe(200));

    const results = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-search-filter-combination.spec-53', async () => expect(results.length).toBeGreaterThan(0));
    for (const name of results) {
      await recordEvidence('assert-toContain-user-license-hub-search-filter-combination.spec-55', async () => expect(name.toLowerCase()).toContain(searchTerm.toLowerCase()));
    }
  });

  test('LIMAS-SUD-1035: Group filter applied after search combines params', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-search-filter-combination.spec-63', async () => expect(names.length).toBeGreaterThan(0));
    const searchTerm = names[0].split(' ')[0];

    await hub.setUserSearch(searchTerm);
    await hub.waitForUserListUpdate();

    await hub.openUserFilters();
    const groups = await hub.getGroupOptionTexts();
    const populatedGroup = await hub.getFirstVisibleUserGroup();
    const targetGroup = groups.find((g) => g === populatedGroup);
    await recordEvidence('assert-toBeTruthy-user-license-hub-search-filter-combination.spec-72', async () => expect(targetGroup).toBeTruthy());

    const responsePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        const gids = url.searchParams.get('groupids') ?? '';
        const fn = url.searchParams.get('firstName') ?? '';
        return gids.split(',').length === 1 && fn === searchTerm;
      },
      { timeout: 15000 }
    );

    await hub.selectGroupOption(targetGroup!);
    await hub.clickSelectButton();

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-search-filter-combination.spec-89', async () => expect(response.status()).toBe(200));

    const results = await hub.getVisibleUserCardNames();
    for (const name of results) {
      await recordEvidence('assert-toContain-user-license-hub-search-filter-combination.spec-93', async () => expect(name.toLowerCase()).toContain(searchTerm.toLowerCase()));
    }
  });

  test('LIMAS-SUD-1036: Clearing search while group active preserves group', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const groups = await hub.getGroupOptionTexts();
    const populatedGroup = await hub.getFirstVisibleUserGroup();
    const targetGroup = groups.find((g) => g === populatedGroup);
    await recordEvidence('assert-toBeTruthy-user-license-hub-search-filter-combination.spec-103', async () => expect(targetGroup).toBeTruthy());

    await hub.selectGroupOption(targetGroup!);
    await hub.clickSelectButton();
    await hub.waitForUserListUpdate();

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-search-filter-combination.spec-110', async () => expect(names.length).toBeGreaterThan(0));
    const searchTerm = names[0].split(' ')[0];

    await hub.setUserSearch(searchTerm);
    await hub.waitForUserListUpdate();

    const responsePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        const gids = url.searchParams.get('groupids') ?? '';
        const fn = url.searchParams.get('firstName') ?? '';
        return gids.split(',').length === 1 && fn === '';
      },
      { timeout: 15000 }
    );

    await hub.clearUserSearch();

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-search-filter-combination.spec-130', async () => expect(response.status()).toBe(200));

    const badge = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-search-filter-combination.spec-133', async () => expect(badge).toBe(1));

    const results = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-search-filter-combination.spec-136', async () => expect(results.length).toBeGreaterThan(0));
  });
});