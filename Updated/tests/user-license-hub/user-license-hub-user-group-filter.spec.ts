import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();
const USERS_API_PATH = '/api/users/f';

test.describe('User & License Hub — User Group Filter', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1029: Group options include All Groups', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const groups = await hub.getGroupOptionTexts();

    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-group-filter.spec-26', async () => expect(groups.length).toBeGreaterThan(1));
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-27', async () => expect(groups[0]).toBe('All Groups'));
  });

  test('LIMAS-SUD-1030: Selecting group filters user list', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const groups = await hub.getGroupOptionTexts();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-group-filter.spec-35', async () => expect(groups.length).toBeGreaterThan(1));
    const populatedGroup = await hub.getFirstVisibleUserGroup();
    const targetGroup = groups.find((g) => g === populatedGroup);
    await recordEvidence('assert-toBeTruthy-user-license-hub-user-group-filter.spec-37', async () => expect(targetGroup).toBeTruthy());

    const responsePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        const gids = url.searchParams.get('groupids') ?? '';
        const pageParam = url.searchParams.get('page');
        return gids.split(',').length === 1 && pageParam === '0';
      },
      { timeout: 15000 }
    );

    await hub.selectGroupOption(targetGroup!);
    await hub.clickSelectButton();

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-54', async () => expect(response.status()).toBe(200));

    const badge = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-57', async () => expect(badge).toBe(1));

    const names = await hub.getVisibleUserCardNames();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-group-filter.spec-60', async () => expect(names.length).toBeGreaterThan(0));

    const summary = await hub.getPaginationSummaryText();
    await recordEvidence('assert-toMatch-user-license-hub-user-group-filter.spec-63', async () => expect(summary).toMatch(/Showing\s+\d+[–-]\d+\s+of\s+\d+/));
  });

  test('LIMAS-SUD-1031: All Groups restores full list', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const groups = await hub.getGroupOptionTexts();
    const populatedGroup = await hub.getFirstVisibleUserGroup();
    const targetGroup = groups.find((g) => g === populatedGroup);
    await recordEvidence('assert-toBeTruthy-user-license-hub-user-group-filter.spec-72', async () => expect(targetGroup).toBeTruthy());

    await hub.selectGroupOption(targetGroup!);
    await hub.clickSelectButton();
    await hub.waitForUserListUpdate();

    const badgeAfterFilter = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-79', async () => expect(badgeAfterFilter).toBe(1));

    await hub.openUserFilters();

    const responsePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(USERS_API_PATH) || resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        const gids = url.searchParams.get('groupids') ?? '';
        const pageParam = url.searchParams.get('page');
        return gids.split(',').length > 1 && pageParam === '0';
      },
      { timeout: 15000 }
    );

    await hub.selectAllGroups();
    await hub.clickSelectButton();

    const response = await responsePromise;
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-98', async () => expect(response.status()).toBe(200));

    const badge = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-101', async () => expect(badge).toBe(0));

    const summary = await hub.getPaginationSummaryText();
    await recordEvidence('assert-toMatch-user-license-hub-user-group-filter.spec-104', async () => expect(summary).toMatch(/Showing\s+\d+[–-]\d+\s+of\s+\d+/));
  });

  test('LIMAS-SUD-1032: Clear resets group selection in dialog', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const groups = await hub.getGroupOptionTexts();
    const populatedGroup = await hub.getFirstVisibleUserGroup();
    const targetGroup = groups.find((g) => g === populatedGroup);
    await recordEvidence('assert-toBeTruthy-user-license-hub-user-group-filter.spec-113', async () => expect(targetGroup).toBeTruthy());

    await hub.selectGroupOption(targetGroup!);

    await hub.clickClearButton();

    const dialog = hub.getFilterDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-user-group-filter.spec-120', async () => expect(dialog).toBeVisible());

    const firstOption = dialog.getByRole('listbox', { name: 'Suggestions' }).getByRole('option').first();
    const firstText = await firstOption.textContent();
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-124', async () => expect(firstText?.trim()).toBe('All Groups'));

    const badge = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-127', async () => expect(badge).toBe(0));
  });

  test('LIMAS-SUD-1033: Filters badge reflects active group', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const initialBadge = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-134', async () => expect(initialBadge).toBe(0));

    await hub.openUserFilters();
    const groups = await hub.getGroupOptionTexts();
    const populatedGroup = await hub.getFirstVisibleUserGroup();
    const targetGroup = groups.find((g) => g === populatedGroup);
    await recordEvidence('assert-toBeTruthy-user-license-hub-user-group-filter.spec-139', async () => expect(targetGroup).toBeTruthy());

    await hub.selectGroupOption(targetGroup!);
    await hub.clickSelectButton();
    await hub.waitForUserListUpdate();

    const badgeAfterApply = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-146', async () => expect(badgeAfterApply).toBe(1));

    await hub.openUserFilters();
    await hub.selectAllGroups();
    await hub.clickSelectButton();
    await hub.waitForUserListUpdate();

    const badgeAfterClear = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-group-filter.spec-154', async () => expect(badgeAfterClear).toBe(0));
  });
});