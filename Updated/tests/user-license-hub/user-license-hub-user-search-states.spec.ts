import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();
const USERS_API_PATH = '/api/users/f';

test.describe('User & License Hub — User Search States', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1019: Email search via same endpoint', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const cards = hub.userCards.locator('h3');
    const count = await cards.count();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-search-states.spec-25', async () => expect(count).toBeGreaterThan(0));

    const emailEl = hub.userCards.first().locator('p').first();
    const emailText = await emailEl.textContent();
    await recordEvidence('assert-toBeTruthy-user-license-hub-user-search-states.spec-29', async () => expect(emailText).toBeTruthy());

    const emailLocal = emailText!.split('@')[0];

    const responsePromise = page.waitForResponse(
      (resp) =>
        resp.url().includes(USERS_API_PATH) &&
        resp.request().method() === 'GET' &&
        (new URL(resp.url()).searchParams.get('firstName') ?? '').length > 0,
      { timeout: 15000 }
    );

    await hub.setUserSearch(emailLocal);

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-44', async () => expect(response.status()).toBe(200));

    const visibleNames = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-search-states.spec-47', async () => expect(visibleNames.length).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-1020: Case-preserving search request', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-search-states.spec-54', async () => expect(names.length).toBeGreaterThan(0));
    const rawName = names[0].split(' ')[0].toLowerCase();
    const mixedCase = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    let receivedFirstName: string | null = null;
    page.on('request', (req) => {
      if (req.url().includes(USERS_API_PATH) && req.method() === 'GET') {
        const url = new URL(req.url());
        const fn = url.searchParams.get('firstName');
        if (fn === mixedCase) receivedFirstName = fn;
      }
    });

    await hub.setUserSearch(mixedCase);
    await hub.waitForUserListUpdate();

    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-70', async () => expect(receivedFirstName).toBe(mixedCase));

    const results = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-search-states.spec-73', async () => expect(results.length).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-1021: No-match search displays empty state', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const noMatchTerm = 'zzznoexist' + Date.now();

    const responsePromise = page.waitForResponse(
      (resp) =>
        resp.url().includes(USERS_API_PATH) &&
        resp.request().method() === 'GET' &&
        new URL(resp.url()).searchParams.get('firstName') === noMatchTerm,
      { timeout: 15000 }
    );

    await hub.setUserSearch(noMatchTerm);

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-92', async () => expect(response.status()).toBe(200));

    await recordEvidence('assert-toBeVisible-user-license-hub-user-search-states.spec-94', async () => expect(page.getByText('No users found')).toBeVisible());

    const cardCount = await hub.getVisibleUserCount();
    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-97', async () => expect(cardCount).toBe(0));

    const paginationVisible = await hub.paginationSummary.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-100', async () => expect(paginationVisible).toBe(false));
  });

  test('LIMAS-SUD-1022: Search value persists in input after response', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-search-states.spec-107', async () => expect(names.length).toBeGreaterThan(0));
    const searchTerm = names[0].split(' ')[0];

    await hub.setUserSearch(searchTerm);
    await hub.waitForUserListUpdate();

    const matchValue = await hub.getSearchInputValue();
    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-114', async () => expect(matchValue).toBe(searchTerm));

    await hub.clearUserSearch();
    await expect(hub.getUserSearchInputLocator()).toHaveValue('');

    const noMatchTerm = 'zzznoexist' + Date.now();

    await hub.setUserSearch(noMatchTerm);
    await page.waitForResponse(
      (resp) =>
        resp.url().includes(USERS_API_PATH) &&
        resp.request().method() === 'GET' &&
        new URL(resp.url()).searchParams.get('firstName') === noMatchTerm,
      { timeout: 15000 }
    );

    const noMatchValue = await hub.getSearchInputValue();
    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-131', async () => expect(noMatchValue).toBe(noMatchTerm));
  });

  test('LIMAS-SUD-1023: Clearing search restores default list', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-search-states.spec-138', async () => expect(names.length).toBeGreaterThan(0));
    const searchTerm = names[0].split(' ')[0];

    await hub.setUserSearch(searchTerm);
    await hub.waitForUserListUpdate();

    const responsePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        return (url.searchParams.get('firstName') ?? '') === '';
      },
      { timeout: 15000 }
    );

    await hub.clearUserSearch();

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-156', async () => expect(response.status()).toBe(200));

    const summary = await hub.getPaginationSummaryText();
    await recordEvidence('assert-toMatch-user-license-hub-user-search-states.spec-159', async () => expect(summary).toMatch(/Showing\s+\d+[–-]\d+\s+of\s+\d+/));

    const pagination = await hub.getPaginationState();
    await recordEvidence('assert-toBe-user-license-hub-user-search-states.spec-162', async () => expect(pagination.currentPage).toBe(1));
  });
});