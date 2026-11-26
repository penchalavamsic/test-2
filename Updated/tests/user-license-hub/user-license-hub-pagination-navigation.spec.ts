import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();
const USERS_API_PATH = '/api/users/f';

test.describe('User & License Hub — Pagination Navigation', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1044: Next button navigates to page 2 with fresh cards', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Verify total pages > 1
    const { currentPage, totalPages } = await hub.parsePageSummary();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-navigation.spec-25', async () => expect(totalPages).toBeGreaterThan(1));

    // Capture page 1 state
    const page1Names = await hub.getVisibleUserCardHeadings();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-navigation.spec-29', async () => expect(page1Names.length).toBeGreaterThan(0));
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-30', async () => expect(await hub.isPreviousEnabled()).toBe(false));
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-31', async () => expect(await hub.isNextEnabled()).toBe(true));

    // Navigate next
    const newPage = await hub.goToNextUserPage();
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-35', async () => expect(newPage).toBe(2));

    // Verify page 2 state
    const page2Names = await hub.getVisibleUserCardHeadings();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-navigation.spec-39', async () => expect(page2Names.length).toBeGreaterThan(0));
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-40', async () => expect(await hub.isPreviousEnabled()).toBe(true));

    // Verify no stale cards from page 1
    const page1Set = new Set(page1Names.map((n) => n.trim()));
    const hasStale = page2Names.some((n) => page1Set.has(n.trim()));
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-45', async () => expect(hasStale).toBe(false));

    // Verify showing range reflects page 2
    const { start, end } = await hub.parsePaginationSummary();
    const pageSize = await hub.getCurrentPageSize();
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-50', async () => expect(start).toBe(pageSize + 1));
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-51', async () => expect(end).toBe(pageSize * 2));
  });

  test('LIMAS-SUD-1045: Previous button navigates back to page 1', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Capture page 1 names
    const page1Names = await hub.getVisibleUserCardHeadings();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-navigation.spec-59', async () => expect(page1Names.length).toBeGreaterThan(0));

    // Go to page 2
    await hub.goToNextUserPage();
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-63', async () => expect(await hub.isPreviousEnabled()).toBe(true));

    // Go back to page 1
    const newPage = await hub.goToPreviousUserPage();
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-67', async () => expect(newPage).toBe(1));

    // Verify previous is disabled again
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-70', async () => expect(await hub.isPreviousEnabled()).toBe(false));
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-71', async () => expect(await hub.isNextEnabled()).toBe(true));

    // Verify showing range back to 1–size
    const { start } = await hub.parsePaginationSummary();
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-75', async () => expect(start).toBe(1));

    // Verify original page 1 names match
    const restoredNames = await hub.getVisibleUserCardHeadings();
    const page1Set = new Set(page1Names.map((n) => n.trim()));
    const allMatch = restoredNames.every((n) => page1Set.has(n.trim()));
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-81', async () => expect(allMatch).toBe(true));
  });

  test('LIMAS-SUD-1046: Next sends GET with incremented page param', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const { currentPage } = await hub.parsePageSummary();
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-88', async () => expect(currentPage).toBe(1));

    const responsePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET')
          return false;
        const url = new URL(resp.url());
        return url.searchParams.get('page') === '1';
      },
      { timeout: 15000 }
    );

    await recordEvidence('action-click-user-license-hub-pagination-navigation.spec-100', async () => hub.nextPageButton.click());
    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-102', async () => expect(response.status()).toBe(200));

    const responseUrl = new URL(response.url());
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-105', async () => expect(responseUrl.searchParams.get('page')).toBe('1'));

    // Verify size and groupids preserved
    const size = responseUrl.searchParams.get('size');
    await recordEvidence('assert-toBeTruthy-user-license-hub-pagination-navigation.spec-109', async () => expect(size).toBeTruthy());
    const groupids = responseUrl.searchParams.get('groupids');
    await recordEvidence('assert-toBeTruthy-user-license-hub-pagination-navigation.spec-111', async () => expect(groupids).toBeTruthy());

    // Verify UI updated
    const { currentPage: newPage } = await hub.parsePageSummary();
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-115', async () => expect(newPage).toBe(2));
  });

  test('LIMAS-SUD-1047: Previous sends GET with decremented page param', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Go to page 2 first
    const responsePromise2 = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET')
          return false;
        const url = new URL(resp.url());
        return url.searchParams.get('page') === '1';
      },
      { timeout: 15000 }
    );
    await recordEvidence('action-click-user-license-hub-pagination-navigation.spec-131', async () => hub.nextPageButton.click());
    await responsePromise2;

    // Now click Previous and verify page=0
    const responsePromise0 = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET')
          return false;
        const url = new URL(resp.url());
        return url.searchParams.get('page') === '0';
      },
      { timeout: 15000 }
    );

    await recordEvidence('action-click-user-license-hub-pagination-navigation.spec-145', async () => hub.previousPageButton.click());
    const response = await responsePromise0;
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-147', async () => expect(response.status()).toBe(200));

    const responseUrl = new URL(response.url());
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-150', async () => expect(responseUrl.searchParams.get('page')).toBe('0'));

    // Verify size and groupids preserved
    const size = responseUrl.searchParams.get('size');
    await recordEvidence('assert-toBeTruthy-user-license-hub-pagination-navigation.spec-154', async () => expect(size).toBeTruthy());
    const groupids = responseUrl.searchParams.get('groupids');
    await recordEvidence('assert-toBeTruthy-user-license-hub-pagination-navigation.spec-156', async () => expect(groupids).toBeTruthy());

    const { currentPage } = await hub.parsePageSummary();
    await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-159', async () => expect(currentPage).toBe(1));
  });

  test('LIMAS-SUD-1048: No stale cards remain after page transition', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Page 1 names
    const page1Names = await hub.getVisibleUserCardHeadings();
    const page1Set = new Set(page1Names.map((n) => n.trim()));

    // Page 2
    await hub.goToNextUserPage();
    const page2Names = await hub.getVisibleUserCardHeadings();
    const page2Set = new Set(page2Names.map((n) => n.trim()));

    // No overlap
    for (const name of page1Set) {
      await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-176', async () => expect(page2Set.has(name)).toBe(false));
    }

    // Back to page 1
    await hub.goToPreviousUserPage();
    const restoredNames = await hub.getVisibleUserCardHeadings();
    const restoredSet = new Set(restoredNames.map((n) => n.trim()));

    // All page 1 names restored, no page 2 names leaked
    for (const name of page1Set) {
      await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-186', async () => expect(restoredSet.has(name)).toBe(true));
    }
    for (const name of page2Set) {
      await recordEvidence('assert-toBe-user-license-hub-pagination-navigation.spec-189', async () => expect(restoredSet.has(name)).toBe(false));
    }
  });
});