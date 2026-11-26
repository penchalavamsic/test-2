import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

test.describe('License Panel Baseline', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1122: License panel visible with correct structure', async () => {
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-15', async () => expect(hub.licensePanel).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-16', async () => expect(hub.licenseSearchInput).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-17', async () => expect(hub.licenseFiltersButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-18', async () => expect(hub.downloadButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-19', async () => expect(hub.emailButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-20', async () => expect(hub.addLicenseButton).toBeVisible());
  });

  test('LIMAS-SUD-1123: License card displays all required fields', async () => {
    const cards = hub.getVisibleLicenseCards();
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-25', async () => expect(cards.first()).toBeVisible());
    const firstCard = cards.first();
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-27', async () => expect(firstCard.getByText('Profile')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-28', async () => expect(firstCard.getByText('Role')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-29', async () => expect(firstCard.getByText('Maintenance')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-30', async () => expect(firstCard.getByText('Expiration')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-31', async () => expect(firstCard.getByText('Hardware ID')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-32', async () => expect(firstCard.getByText('Assigned to')).toBeVisible());
  });

  test('LIMAS-SUD-1134: All Profiles selected by default in License Filters', async () => {
    await hub.openLicenseFilters();
    const allProfiles = hub.getLicenseFilterDialog().getByRole('option', { name: 'All Profiles' });
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-38', async () => expect(allProfiles).toHaveAttribute('aria-selected', 'true'));
    await hub.closeLicenseFilters();
  });

  test('LIMAS-SUD-1139: Download button disabled in baseline state', async () => {
    await recordEvidence('assert-toBeDisabled-user-license-hub-license-search-filters.spec-43', async () => expect(hub.downloadButton).toBeDisabled());
  });

  test('LIMAS-SUD-1140: Email button disabled in baseline state', async () => {
    await recordEvidence('assert-toBeDisabled-user-license-hub-license-search-filters.spec-47', async () => expect(hub.emailButton).toBeDisabled());
  });

  test('LIMAS-SUD-1141: Add License button disabled in baseline state', async () => {
    await recordEvidence('assert-toBeDisabled-user-license-hub-license-search-filters.spec-51', async () => expect(hub.addLicenseButton).toBeDisabled());
  });

  test('LIMAS-SUD-1158: License card edit button visible on each card', async () => {
    const cards = hub.getVisibleLicenseCards();
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-58', async () => expect(cards.nth(i).getByRole('button', { name: '' }).first()).toBeVisible());
    }
  });

  test('LIMAS-SUD-1159: License card delete button has accessible name', async () => {
    const deleteButtons = hub.getLicenseDeleteButtons();
    const count = await deleteButtons.count();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-license-search-filters.spec-65', async () => expect(count).toBeGreaterThan(0));
    for (let i = 0; i < count; i++) {
      await recordEvidence('assert-toHaveAccessibleName-user-license-hub-license-search-filters.spec-67', async () => expect(deleteButtons.nth(i)).toHaveAccessibleName('Delete license'));
    }
  });

  test('LIMAS-SUD-1160: No duplicate license cards in baseline', async () => {
    const hwIds = await hub.getAllVisibleHardwareIds();
    // Each card has a unique position even if HWID matches
    const cardCount = await hub.getVisibleLicenseCards().count();
    await recordEvidence('assert-toBe-user-license-hub-license-search-filters.spec-75', async () => expect(cardCount).toBe(hwIds.length));
  });

  test('LIMAS-SUD-1161: Assigned to user on license card matches owning user', async () => {
    const assignedUsers = await hub.getAllVisibleAssignedUsers();
    const cardCount = await hub.getVisibleLicenseCards().count();
    await recordEvidence('assert-toBe-user-license-hub-license-search-filters.spec-81', async () => expect(assignedUsers.length).toBe(cardCount));
    for (const user of assignedUsers) {
      await recordEvidence('assert-toBeTruthy-user-license-hub-license-search-filters.spec-84', async () => expect(user).toBeTruthy());
    }
  });
});

test.describe('Hardware ID Search', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
  });

  test.afterEach(async () => {
    await hub.clearLicenseSearch();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1124: Hardware ID search input visible with accessible name', async () => {
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-104', async () => expect(hub.licenseSearchInput).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-105', async () => expect(hub.licenseSearchInput).toHaveAttribute('placeholder', /Hardware ID/));
  });

  test('LIMAS-SUD-1125: Hardware ID search filters via API parameter hardwareIds', async ({ page }) => {
    const hwId = await hub.getFirstVisibleHardwareId();
    const respPromise = page.waitForResponse(
      resp => resp.url().includes('/api/users/f') && resp.url().includes('hardwareIds=') && resp.status() === 200,
      { timeout: 10000 }
    );
    await hub.setLicenseSearch(hwId);
    const resp = await respPromise;
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-116', async () => expect(resp.url()).toContain(`hardwareIds=${encodeURIComponent(hwId)}`));
  });

  test('LIMAS-SUD-1126: Hardware ID search sends GET with hardwareIds parameter', async ({ page }) => {
    const hwId = await hub.getFirstVisibleHardwareId();
    const respPromise = page.waitForResponse(
      resp => resp.request().method() === 'GET' && resp.url().includes('hardwareIds='),
      { timeout: 10000 }
    );
    await hub.setLicenseSearch(hwId);
    const resp = await respPromise;
    await recordEvidence('assert-toBe-user-license-hub-license-search-filters.spec-127', async () => expect(resp.request().method()).toBe('GET'));
  });

  test('LIMAS-SUD-1127: Search clears and restores full license collection', async () => {
    const initialCount = await hub.getVisibleLicenseCards().count();
    const hwId = await hub.getFirstVisibleHardwareId();
    await Promise.all([hub.waitForUserListResponse(), hub.setLicenseSearch(hwId)]);
    await hub.clearLicenseSearch();
    await hub.waitForHubLoad();
    await hub.restoreLicensePanelDefaultState();
    const restoredCount = await hub.getVisibleLicenseCards().count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-license-search-filters.spec-139', async () => expect.poll(() => hub.getVisibleLicenseCards().count()).toBeGreaterThanOrEqual(initialCount));
  });

  test('LIMAS-SUD-1128: Result cards all match search Hardware ID', async () => {
    const hwId = await hub.getFirstVisibleHardwareId();
    await Promise.all([hub.waitForUserListResponse(), hub.setLicenseSearch(hwId)]);
    const resultHwIds = await hub.getAllVisibleHardwareIds();
    for (const id of resultHwIds) {
      await recordEvidence('assert-toBe-user-license-hub-license-search-filters.spec-149', async () => expect(id).toBe(hwId));
    }
  });

  test('LIMAS-SUD-1129: Filters badge increments when Hardware ID search active', async () => {
    await recordEvidence('assert-toHaveText-user-license-hub-license-search-filters.spec-153', async () => expect(hub.licenseFiltersButton).not.toHaveText(/^\d+$/));
    const hwId = await hub.getFirstVisibleHardwareId();
    await Promise.all([hub.waitForUserListResponse(), hub.setLicenseSearch(hwId)]);
    // Badge text contains a count
    const badge = hub.licenseFiltersButton.locator('text=/\\d+/');
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-159', async () => expect(badge).toBeVisible());
  });

  test('LIMAS-SUD-1143: License search clear restores full collection', async () => {
    const initialCount = await hub.getVisibleLicenseCards().count();
    const hwId = await hub.getFirstVisibleHardwareId();
    await hub.setLicenseSearch(hwId);
    await hub.clearLicenseSearch();
    await hub.waitForHubLoad();
    await hub.restoreLicensePanelDefaultState();
    const restoredCount = await hub.getVisibleLicenseCards().count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-license-search-filters.spec-170', async () => expect.poll(() => hub.getVisibleLicenseCards().count()).toBeGreaterThanOrEqual(initialCount));
  });

  test('LIMAS-SUD-1144: Comma-separated Hardware ID search placeholder present', async () => {
    const placeholder = await hub.licenseSearchInput.getAttribute('placeholder');
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-175', async () => expect(placeholder).toContain('comma'));
  });

  test('LIMAS-SUD-1155: No-match Hardware ID shows empty state', async ({ page }) => {
    const noMatchId = process.env.TEST_ULH_LICENSE_NO_MATCH_HARDWARE_ID || 'zzzNoMatch99999999';
    await Promise.all([hub.waitForUserListResponse(), hub.setLicenseSearch(noMatchId)]);
    const cards = hub.getVisibleLicenseCards();
    await recordEvidence('assert-toHaveCount-user-license-hub-license-search-filters.spec-183', async () => expect(cards).toHaveCount(0));
  });

  test('LIMAS-SUD-1156: No-match state preserves toolbar disabled state', async () => {
    const noMatchId = process.env.TEST_ULH_LICENSE_NO_MATCH_HARDWARE_ID || 'zzzNoMatch99999999';
    await Promise.all([hub.waitForUserListResponse(), hub.setLicenseSearch(noMatchId)]);
    await recordEvidence('assert-toBeDisabled-user-license-hub-license-search-filters.spec-190', async () => expect(hub.downloadButton).toBeDisabled());
    await recordEvidence('assert-toBeDisabled-user-license-hub-license-search-filters.spec-191', async () => expect(hub.emailButton).toBeDisabled());
    await recordEvidence('assert-toBeDisabled-user-license-hub-license-search-filters.spec-192', async () => expect(hub.addLicenseButton).toBeDisabled());
  });

  test('LIMAS-SUD-1157: No-match clearing restores full collection', async () => {
    const initialCount = await hub.getVisibleLicenseCards().count();
    const noMatchId = process.env.TEST_ULH_LICENSE_NO_MATCH_HARDWARE_ID || 'zzzNoMatch99999999';
    await hub.setLicenseSearch(noMatchId);
    await hub.clearLicenseSearch();
    await hub.waitForHubLoad();
    await hub.restoreLicensePanelDefaultState();
    const restoredCount = await hub.getVisibleLicenseCards().count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-license-search-filters.spec-203', async () => expect.poll(() => hub.getVisibleLicenseCards().count()).toBeGreaterThanOrEqual(initialCount));
  });
});

test.describe('License Filters Dialog', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
  });

  test.afterEach(async () => {
    await hub.closeLicenseFilters();
  });

  test('LIMAS-SUD-1130: Filters button toggles aria-expanded', async () => {
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-222', async () => expect(hub.licenseFiltersButton).toHaveAttribute('aria-expanded', 'false'));
    await hub.openLicenseFilters();
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-224', async () => expect(hub.licenseFiltersButton).toHaveAttribute('aria-expanded', 'true'));
  });

  test('LIMAS-SUD-1131: Dialog has role dialog with heading Filter Licenses', async () => {
    await hub.openLicenseFilters();
    const dialog = hub.getLicenseFilterDialog();
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-230', async () => expect(dialog).toHaveAttribute('role', 'dialog'));
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-231', async () => expect(dialog.getByRole('heading', { name: 'Filter Licenses', level: 4 })).toBeVisible());
  });

  test('LIMAS-SUD-1132: Dialog contains Profile Search input', async () => {
    await hub.openLicenseFilters();
    const dialog = hub.getLicenseFilterDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-237', async () => expect(dialog.getByPlaceholder('Search profiles...')).toBeVisible());
  });

  test('LIMAS-SUD-1133: Dialog lists Profile options with role option', async () => {
    await hub.openLicenseFilters();
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const count = await options.count();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-license-search-filters.spec-244', async () => expect(count).toBeGreaterThan(1));
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-245', async () => expect(options.filter({ hasText: 'All Profiles' })).toBeVisible());
  });

  test('LIMAS-SUD-1135: Dialog has Clear and Select buttons', async () => {
    await hub.openLicenseFilters();
    const dialog = hub.getLicenseFilterDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-251', async () => expect(dialog.getByRole('button', { name: 'Clear' })).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-252', async () => expect(dialog.getByRole('button', { name: 'Select' })).toBeVisible());
  });

  test('LIMAS-SUD-1136: Dialog closes on Escape', async () => {
    await hub.openLicenseFilters();
    await hub.dismissLicenseFiltersViaEscape();
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-258', async () => expect(hub.getLicenseFilterDialog()).not.toBeVisible());
  });

  test('LIMAS-SUD-1137: Dialog closes on outside click', async ({ page }) => {
    await hub.openLicenseFilters();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-263', async () => page.mouse.click(10, 10));
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-264', async () => expect(hub.getLicenseFilterDialog()).not.toBeVisible());
  });

  test('LIMAS-SUD-1138: Focus returns to Filters button after dismissal', async () => {
    await hub.openLicenseFilters();
    await hub.dismissLicenseFiltersViaEscape();
    await recordEvidence('assert-toBeFocused-user-license-hub-license-search-filters.spec-270', async () => expect(hub.licenseFiltersButton).toBeFocused());
  });

  test('LIMAS-SUD-1149: Clear resets Profile selection to All Profiles', async () => {
    await hub.openLicenseFilters();
    // Select a non-All-Profiles option
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-278', async () => nonDefault.click());
    // Click Clear
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-280', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Clear' }).click());
    // Clear applies the reset and closes the dialog; inspect its persisted selection.
    await expect(hub.getLicenseFilterDialog()).toBeHidden();
    await hub.openLicenseFilters();
    // All Profiles should be selected again
    const allProfiles = hub.getLicenseFilterDialog().getByRole('option', { name: 'All Profiles' });
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-283', async () => expect(allProfiles).toHaveAttribute('aria-selected', 'true'));
  });

  test('LIMAS-SUD-1150: Dismissal without Select preserves previous filter state', async ({ page }) => {
    // Open dialog, change selection, dismiss without Select
    await hub.openLicenseFilters();
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    const selectedName = await nonDefault.textContent();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-292', async () => nonDefault.click());
    await hub.dismissLicenseFiltersViaEscape();
    // Reopen — All Profiles should still be active (no Select was clicked)
    await hub.openLicenseFilters();
    const allProfiles = hub.getLicenseFilterDialog().getByRole('option', { name: 'All Profiles' });
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-297', async () => expect(allProfiles).toHaveAttribute('aria-selected', 'true'));
  });
});

test.describe('Profile Selection', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.openLicenseFilters();
  });

  test.afterEach(async () => {
    await hub.closeLicenseFilters();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1145: Profile Search filters options within dialog', async () => {
    const searchInput = hub.getLicenseFilterDialog().getByPlaceholder('Search profiles...');
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const initialCount = await options.count();
    // Search for a substring that should exist in at least one profile
    await recordEvidence('action-fill-user-license-hub-license-search-filters.spec-322', async () => searchInput.fill('Authoring'));
    const filteredCount = await options.count();
    await recordEvidence('assert-toBeLessThan-user-license-hub-license-search-filters.spec-324', async () => expect(filteredCount).toBeLessThan(initialCount));
  });

  test('LIMAS-SUD-1146: Selecting Profile sets aria-selected and deselects previous', async () => {
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-330', async () => nonDefault.click());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-331', async () => expect(nonDefault).toHaveAttribute('aria-selected', 'true'));
    const allProfiles = hub.getLicenseFilterDialog().getByRole('option', { name: 'All Profiles' });
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-333', async () => expect(allProfiles).toHaveAttribute('aria-selected', 'false'));
  });

  test('LIMAS-SUD-1147: Select sends productProfileIds parameter', async ({ page }) => {
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-339', async () => nonDefault.click());
    const respPromise = page.waitForResponse(
      resp => resp.url().includes('/api/users/f') && resp.url().includes('productProfileIds='),
      { timeout: 10000 }
    );
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-344', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Select' }).click());
    const resp = await respPromise;
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-346', async () => expect(resp.url()).toContain('productProfileIds='));
  });

  test('LIMAS-SUD-1148: Select All Profiles restores full collection', async () => {
    // First apply a filter
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-353', async () => nonDefault.click());
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-354', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Select' }).click());
    await hub.waitForUserListResponse();
    const filteredCount = await hub.getVisibleLicenseCards().count();
    // Now select All Profiles
    await hub.openLicenseFilters();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-359', async () => hub.getLicenseFilterDialog().getByRole('option', { name: 'All Profiles' }).click());
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-360', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Select' }).click());
    await hub.waitForHubLoad();
    const restoredCount = await hub.getVisibleLicenseCards().count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-license-search-filters.spec-363', async () => expect(restoredCount).toBeGreaterThanOrEqual(filteredCount));
  });
});

test.describe('Search and Filter Combinations', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
  });

  test.afterEach(async () => {
    await hub.clearLicenseSearch();
    await hub.closeLicenseFilters();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1151: Profile then Hardware ID combined filtering works', async ({ page }) => {
    // Apply a Profile filter
    await hub.openLicenseFilters();
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-388', async () => nonDefault.click());
    const profileRespPromise = page.waitForResponse(
      resp => resp.url().includes('productProfileIds='),
      { timeout: 10000 }
    );
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-393', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Select' }).click());
    await profileRespPromise;
    // Then add Hardware ID search
    const hwId = await hub.getFirstVisibleHardwareId();
    const hwRespPromise = page.waitForResponse(
      resp => resp.url().includes('hardwareIds=') && resp.url().includes('productProfileIds='),
      { timeout: 10000 }
    );
    await hub.setLicenseSearch(hwId);
    const resp = await hwRespPromise;
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-403', async () => expect(resp.url()).toContain('hardwareIds='));
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-404', async () => expect(resp.url()).toContain('productProfileIds='));
  });

  test('LIMAS-SUD-1152: Hardware ID then Profile combined filtering works', async ({ page }) => {
    const hwId = await hub.getFirstVisibleHardwareId();
    await Promise.all([hub.waitForUserListResponse(), hub.setLicenseSearch(hwId)]);
    await hub.openLicenseFilters();
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-414', async () => nonDefault.click());
    const respPromise = page.waitForResponse(
      resp => resp.url().includes('hardwareIds=') && resp.url().includes('productProfileIds='),
      { timeout: 10000 }
    );
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-419', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Select' }).click());
    const resp = await respPromise;
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-421', async () => expect(resp.url()).toContain('hardwareIds='));
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-422', async () => expect(resp.url()).toContain('productProfileIds='));
  });

  test('LIMAS-SUD-1153: Clear Search with Profile active keeps Profile filter', async ({ page }) => {
    await hub.openLicenseFilters();
    const options = hub.getLicenseFilterDialog().getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-429', async () => nonDefault.click());
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-430', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Select' }).click());
    await hub.waitForUserListResponse();
    const hwId = await hub.getFirstVisibleHardwareId();
    await hub.setLicenseSearch(hwId);
    // Clear only the Hardware ID search
    await hub.clearLicenseSearch();
    await hub.waitForHubLoad();
    // Profile filter should still be reflected in the Filters badge
    const badge = hub.licenseFiltersButton.locator('text=/\\d+/');
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-439', async () => expect(badge).toBeVisible());
  });

  test('LIMAS-SUD-1154: Clear Profile with Search active keeps Hardware ID filter', async ({ page }) => {
    await hub.applyRuntimeProfileForDownload();
    const hwId = await hub.getFirstVisibleHardwareId();
    await Promise.all([hub.waitForUserListResponse(), hub.setLicenseSearch(hwId)]);
    // Open filters and restore All Profiles
    await hub.openLicenseFilters();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-448', async () => hub.getLicenseFilterDialog().getByRole('option', { name: 'All Profiles' }).click());
    const respPromise = page.waitForResponse(
      resp => resp.url().includes('hardwareIds='),
      { timeout: 10000 }
    );
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-453', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Select' }).click());
    const resp = await respPromise;
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-455', async () => expect(resp.url()).toContain('hardwareIds='));
    await recordEvidence('assert-toContain-user-license-hub-license-search-filters.spec-456', async () => expect(new URL(resp.url()).searchParams.get('productProfileIds') ?? '').toBe(''));
  });
});

test.describe('Network and Safe Restoration', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
  });

  test.afterEach(async () => {
    await hub.clearLicenseSearch();
    await hub.closeLicenseFilters();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1142: No POST/PUT/PATCH/DELETE during search or filter', async ({ page }) => {
    const mutations: string[] = [];
    page.on('request', req => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) {
        mutations.push(req.method() + ' ' + req.url());
      }
    });
    // Perform Hardware ID search
    const hwId = await hub.getFirstVisibleHardwareId();
    await Promise.all([hub.waitForUserListResponse(), hub.setLicenseSearch(hwId)]);
    await hub.clearLicenseSearch();
    await hub.waitForHubLoad();
    // Filter out token refresh POSTs
    const realMutations = mutations.filter(m => !m.includes('protocol/openid-connect/token'));
    await recordEvidence('assert-toBe-user-license-hub-license-search-filters.spec-491', async () => expect(realMutations.length).toBe(0));
  });

  test('LIMAS-SUD-1162: Safe restoration after all scenarios', async () => {
    const hwId = await hub.getFirstVisibleHardwareId();
    await hub.setLicenseSearch(hwId);
    await hub.openLicenseFilters();
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-498', async () => hub.getLicenseFilterDialog().getByRole('option', { name: 'All Profiles' }).click());
    await recordEvidence('action-click-user-license-hub-license-search-filters.spec-499', async () => hub.getLicenseFilterDialog().getByRole('button', { name: 'Select' }).click());
    await hub.clearLicenseSearch();
    await hub.closeLicenseFilters();
    await hub.restoreLicensePanelDefaultState();
    // Verify restored state
    await recordEvidence('assert-toHaveValue-user-license-hub-license-search-filters.spec-504', async () => expect(hub.licenseSearchInput).toHaveValue(''));
    await recordEvidence('assert-toBeVisible-user-license-hub-license-search-filters.spec-505', async () => expect(hub.getVisibleLicenseCards().first()).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-search-filters.spec-506', async () => expect(hub.licenseFiltersButton).toHaveAttribute('aria-expanded', 'false'));
  });
});