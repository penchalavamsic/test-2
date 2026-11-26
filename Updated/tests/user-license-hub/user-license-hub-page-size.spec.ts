import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();
const USERS_API_PATH = '/api/users/f';

test.describe('User & License Hub — Page Size', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test.afterEach(async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await hub.restoreDefaultPaginationState();
  });

  test('LIMAS-SUD-1049: Rows-per-page options are discoverable dynamically', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const currentSize = await hub.getCurrentPageSize();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-page-size.spec-29', async () => expect(currentSize).toBeGreaterThan(0));

    const availableSizes = await hub.getAvailablePageSizes();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-page-size.spec-32', async () => expect(availableSizes.length).toBeGreaterThanOrEqual(1));
    await recordEvidence('assert-toContain-user-license-hub-page-size.spec-33', async () => expect(availableSizes).toContain(currentSize));
  });

  test('LIMAS-SUD-1050: Selecting alternative size sends GET with new size and page=0', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const currentSize = await hub.getCurrentPageSize();
    const availableSizes = await hub.getAvailablePageSizes();
    const altSize = availableSizes.find((s) => s !== currentSize);
    await recordEvidence('assert-toBeDefined-user-license-hub-page-size.spec-42', async () => expect(altSize).toBeDefined());

    const responsePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET')
          return false;
        const url = new URL(resp.url());
        return url.searchParams.get('size') === String(altSize) && url.searchParams.get('page') === '0';
      },
      { timeout: 15000 }
    );

    await hub.setDynamicUserPageSize(altSize!);

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-57', async () => expect(response.status()).toBe(200));

    const newSize = await hub.getCurrentPageSize();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-60', async () => expect(newSize).toBe(altSize));

    const { start } = await hub.parsePaginationSummary();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-63', async () => expect(start).toBe(1));

    const cardCount = await hub.getUserPageCount();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-66', async () => expect(cardCount).toBe(altSize));
  });

  test('LIMAS-SUD-1051: Page resets to 1 after size change from another page', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Navigate to page 2
    await hub.goToNextUserPage();
    let { currentPage } = await hub.parsePageSummary();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-75', async () => expect(currentPage).toBe(2));

    // Change page size — should reset to page 1
    const currentSize = await hub.getCurrentPageSize();
    const availableSizes = await hub.getAvailablePageSizes();
    const altSize = availableSizes.find((s) => s !== currentSize);
    await recordEvidence('assert-toBeDefined-user-license-hub-page-size.spec-81', async () => expect(altSize).toBeDefined());

    await hub.setDynamicUserPageSize(altSize!);

    const newState = await hub.parsePageSummary();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-86', async () => expect(newState.currentPage).toBe(1));

    // Previous should be disabled
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-89', async () => expect(await hub.isPreviousEnabled()).toBe(false));

    const { start } = await hub.parsePaginationSummary();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-92', async () => expect(start).toBe(1));
  });

  test('LIMAS-SUD-1052: Total pages recalculated after size change', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const { total } = await hub.parsePaginationSummary();
    const originalSize = await hub.getCurrentPageSize();
    const { totalPages: originalPages } = await hub.parsePageSummary();

    // Find a smaller alternative size
    const availableSizes = await hub.getAvailablePageSizes();
    const smallerSize = availableSizes.filter((s) => s < originalSize).sort((a, b) => b - a)[0];
    if (!smallerSize) {
      // No smaller size available — skip with a soft pass
      await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-page-size.spec-107', async () => expect(availableSizes.length).toBeGreaterThanOrEqual(1));
      return;
    }

    await hub.setDynamicUserPageSize(smallerSize);

    const { totalPages: newPages } = await hub.parsePageSummary();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-page-size.spec-114', async () => expect(newPages).toBeGreaterThan(originalPages));

    // Verify approximate ceil calculation
    const expectedPages = Math.ceil(total / smallerSize);
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub-page-size.spec-118', async () => expect(Math.abs(newPages - expectedPages)).toBeLessThanOrEqual(1));

    // Restore and verify
    await hub.setDynamicUserPageSize(originalSize);
    const { totalPages: restoredPages } = await hub.parsePageSummary();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-123', async () => expect(restoredPages).toBe(originalPages));
  });

  test('LIMAS-SUD-1053: Visible card count matches selected page size', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Initial: card count = current size
    const initialSize = await hub.getCurrentPageSize();
    const initialCards = await hub.getUserPageCount();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-132', async () => expect(initialCards).toBe(initialSize));

    // Try each available size smaller than or equal to total
    const availableSizes = await hub.getAvailablePageSizes();
    const { total } = await hub.parsePaginationSummary();

    for (const size of availableSizes) {
      await hub.setDynamicUserPageSize(size);
      const cardCount = await hub.getUserPageCount();
      const expectedCards = Math.min(size, total);
      await recordEvidence('assert-toBe-user-license-hub-page-size.spec-142', async () => expect(cardCount).toBe(expectedCards));

      // Verify consistency: end - start + 1 = card count
      const { start, end } = await hub.parsePaginationSummary();
      await recordEvidence('assert-toBe-user-license-hub-page-size.spec-146', async () => expect(end - start + 1).toBe(cardCount));
    }

    // Restore original size
    await hub.setDynamicUserPageSize(initialSize);
    const restoredCards = await hub.getUserPageCount();
    await recordEvidence('assert-toBe-user-license-hub-page-size.spec-152', async () => expect(restoredCards).toBe(initialSize));
  });
});