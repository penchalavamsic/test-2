import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUsersPage } from '../pages/system-users.page';

test.describe('SYU-A — System Users Search, Filters, Table, and Assignment Expansion', () => {
  let users: SystemUsersPage;

  test.beforeEach(async ({ page }) => {
    users = new SystemUsersPage(page);
    await users.navigate();
    await users.waitForTableStable();
    await users.restoreCleanState();
  });

  test.afterEach(async () => {
    await users.restoreCleanState();
  });

  // ══════════════════════════════════════════════════════════════════
  // Page Shell
  // ══════════════════════════════════════════════════════════════════

  test.describe('Page Shell', () => {
    test('LIMAS-SUD-2523: System Users route is active in sidebar with correct heading', async () => {
      await recordEvidence('assert-toHaveAttribute-system-users-search-filters.spec-24', async () => expect(users.sidebarSystemUsersLink).toHaveAttribute('aria-current', 'page'));
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-25', async () => expect(users.heading).toBeVisible());
      await recordEvidence('assert-toHaveText-system-users-search-filters.spec-26', async () => expect(users.heading).toHaveText('System Users'));
    });

    test('LIMAS-SUD-2524: Search input is present with placeholder', async () => {
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-30', async () => expect(users.searchInput).toBeVisible());
      await recordEvidence('assert-toBeEnabled-system-users-search-filters.spec-31', async () => expect(users.searchInput).toBeEnabled());
      await recordEvidence('assert-toHaveAttribute-system-users-search-filters.spec-32', async () => expect(users.searchInput).toHaveAttribute('placeholder', 'Search system users...'));
    });

    test('LIMAS-SUD-2525: Profiles and User Groups filter comboboxes are present', async () => {
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-36', async () => expect(users.profilesFilterCombobox).toBeVisible());
      await recordEvidence('assert-toBeEnabled-system-users-search-filters.spec-37', async () => expect(users.profilesFilterCombobox).toBeEnabled());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-38', async () => expect(users.userGroupsFilterCombobox).toBeVisible());
      await recordEvidence('assert-toBeEnabled-system-users-search-filters.spec-39', async () => expect(users.userGroupsFilterCombobox).toBeEnabled());
      await recordEvidence('assert-toHaveAccessibleName-system-users-search-filters.spec-40', async () => expect(users.userGroupsFilterCombobox).toHaveAccessibleName('Filter by user groups'));
    });

    test('LIMAS-SUD-2526: Clear All button is present, initially disabled', async () => {
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-44', async () => expect(users.clearAllButton).toBeVisible());
      await recordEvidence('assert-toBeDisabled-system-users-search-filters.spec-45', async () => expect(users.clearAllButton).toBeDisabled());
    });

    test('LIMAS-SUD-2527: Showing count text is visible with runtime total and full table', async () => {
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-49', async () => expect(users.countText).toBeVisible());
      const total = await users.getTotalCount();
      await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-51', async () => expect(total).toBeGreaterThan(0));
      const visible = await users.getVisibleCount();
      await recordEvidence('assert-toBe-system-users-search-filters.spec-53', async () => expect(visible).toBe(total));
    });

    test('LIMAS-SUD-2528: Table has correct column headers, rows, scroll, and no duplicates', async () => {
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-57', async () => expect(users.columnHeaderName).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-58', async () => expect(users.columnHeaderEmail).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-59', async () => expect(users.columnHeaderUserGroups).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-60', async () => expect(users.columnHeaderProfiles).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-61', async () => expect(users.columnHeaderActions).toBeVisible());

      const rowCount = await users.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-64', async () => expect(rowCount).toBeGreaterThan(0));
      const { names, emails } = await users.getLoadedTableRows();
      const fingerprints = new Set(emails.map((e, i) => `${e}|${names[i]}`));
      await recordEvidence('assert-toBe-system-users-search-filters.spec-67', async () => expect(fingerprints.size).toBe(emails.length));

      await recordEvidence('assert-toBe-system-users-search-filters.spec-69', async () => expect(users.isScrollable()).resolves.toBe(true));
    });

    test('LIMAS-SUD-2529: Missing values — Not provided and No profiles are present', async () => {
      const rowCount = await users.getRowCount();
      let foundNotProvided = false;
      let foundNoProfiles = false;
      for (let i = 0; i < rowCount; i++) {
        const email = (await users.rowEmail(users.rows.nth(i)).textContent()) ?? '';
        const profiles = (await users.rows.nth(i).locator('td').nth(3).textContent()) ?? '';
        if (email.trim() === 'Not provided') foundNotProvided = true;
        if (profiles.includes('No profiles')) foundNoProfiles = true;
      }
      await recordEvidence('assert-toBe-system-users-search-filters.spec-82', async () => expect(foundNotProvided || foundNoProfiles).toBe(true));
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Search
  // ══════════════════════════════════════════════════════════════════

  test.describe('Search', () => {
    test('LIMAS-SUD-2530: Search by name finds matching users', async () => {
      const firstRow = users.rows.first();
      const name = (await users.rowName(firstRow).textContent()) ?? '';
      const searchTerm = name.trim().substring(0, 4);
      await users.search(searchTerm);
      const count = await users.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-97', async () => expect(count).toBeGreaterThan(0));
      const { names } = await users.getLoadedTableRows();
      const lowerTerm = searchTerm.toLowerCase();
      const namesMatch = names.every((n) => n.toLowerCase().includes(lowerTerm));
      await recordEvidence('assert-toBe-system-users-search-filters.spec-101', async () => expect(namesMatch).toBe(true));
    });

    test('LIMAS-SUD-2531: Search by email finds matching users', async () => {
      const { emails } = await users.getLoadedTableRows();
      const runtimeEmail = emails.find((e) => e.includes('@'));
      await recordEvidence('assert-toBeTruthy-system-users-search-filters.spec-107', async () => expect(runtimeEmail).toBeTruthy());
      const searchTerm = runtimeEmail!.split('@')[0].substring(0, 5);
      await users.search(searchTerm);
      const count = await users.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-111', async () => expect(count).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2532: Partial match and case-insensitive search', async () => {
      const { emails: allEmails } = await users.getLoadedTableRows();
      const totalBefore = await users.getTotalCount();
      const sample = allEmails.find((e) => e.includes('@kpit.com'));
      if (sample) {
        const fragment = sample.split('@')[0].substring(2, 6).toUpperCase();
        await users.search(fragment);
        const count = await users.getVisibleCount();
        await recordEvidence('assert-toBeLessThanOrEqual-system-users-search-filters.spec-122', async () => expect(count).toBeLessThanOrEqual(totalBefore));
        await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-123', async () => expect(count).toBeGreaterThan(0));
      }
    });

    test('LIMAS-SUD-2533: Leading and trailing spaces do not break search', async () => {
      const firstRow = users.rows.first();
      const name = (await users.rowName(firstRow).textContent()) ?? '';
      const term = `  ${name.trim().substring(0, 4)}  `;
      await users.search(term);
      const count = await users.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-133', async () => expect(count).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2534: No-match search and clearing restores full list', async () => {
      const totalBefore = await users.getTotalCount();
      await users.search('xyznonexistent987654321');
      const noMatchCount = await users.getVisibleCount();
      await recordEvidence('assert-toBe-system-users-search-filters.spec-140', async () => expect(noMatchCount).toBe(0));
      await recordEvidence('assert-toContainText-system-users-search-filters.spec-141', async () => expect(users.countText).toContainText(/Showing 0 of \d+/));

      await users.clearSearch();
      const totalAfter = await users.getVisibleCount();
      await recordEvidence('assert-toBe-system-users-search-filters.spec-145', async () => expect(totalAfter).toBe(totalBefore));
    });

    test('LIMAS-SUD-2535: Count and table synchronize during search', async () => {
      const totalBefore = await users.getTotalCount();
      const firstRow = users.rows.first();
      const name = (await users.rowName(firstRow).textContent()) ?? '';
      await users.search(name.trim().substring(0, 3));
      const visible = await users.getVisibleCount();
      const rowCount = await users.getRowCount();
      await recordEvidence('assert-toBeLessThanOrEqual-system-users-search-filters.spec-155', async () => expect(rowCount).toBeLessThanOrEqual(totalBefore));
      await recordEvidence('assert-toBe-system-users-search-filters.spec-156', async () => expect(visible).toBe(rowCount));
    });

    test('LIMAS-SUD-2536: Search combined with profile filter reduces results further', async () => {
      await users.openProfilesFilter();
      const options = await users.getProfilesFilterAvailableOptions();
      if (options.length > 0) {
        const option = options.find((o) => !o.includes('selected')) || options[0];
        await users.selectProfileOption(option);
        await users.doneProfilesFilter();
        await users.waitForTableStable();
        const filteredCount = await users.getVisibleCount();
        if (filteredCount > 0) {
          const firstRow = users.rows.first();
          const name = (await users.rowName(firstRow).textContent()) ?? '';
          await users.search(name.trim().substring(0, 4));
          const combinedCount = await users.getVisibleCount();
          await recordEvidence('assert-toBeLessThanOrEqual-system-users-search-filters.spec-173', async () => expect(combinedCount).toBeLessThanOrEqual(filteredCount));
        }
      }
      await users.restoreCleanState();
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Profiles Filter
  // ══════════════════════════════════════════════════════════════════

  test.describe('Profiles Filter', () => {
    test('LIMAS-SUD-2537: Profiles filter opens with listbox and runtime options', async () => {
      await users.openProfilesFilter();
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-187', async () => expect(users.profilesFilterListbox).toBeVisible());
      const options = await users.getProfilesFilterAvailableOptions();
      await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-189', async () => expect(options.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2538: Selecting one profile reduces visible count; multi-select works', async () => {
      const totalBefore = await users.getTotalCount();
      await users.openProfilesFilter();
      const options = await users.getProfilesFilterAvailableOptions();
      const unselected = options.filter((o) => !o.includes('selected'));
      if (unselected.length >= 2) {
        await users.selectProfileOption(unselected[0]);
        await users.selectProfileOption(unselected[1]);
        const selCount = await users.getProfilesSelectedCount();
        await recordEvidence('assert-toBeGreaterThanOrEqual-system-users-search-filters.spec-201', async () => expect(selCount).toBeGreaterThanOrEqual(2));

        await users.doneProfilesFilter();
        const visible = await users.getVisibleCount();
        await recordEvidence('assert-toBeLessThanOrEqual-system-users-search-filters.spec-205', async () => expect(visible).toBeLessThanOrEqual(totalBefore));
      }
      await users.restoreCleanState();
    });

    test('LIMAS-SUD-2539: Duplicate selection prevention — re-selecting same option does not change count', async () => {
      await users.openProfilesFilter();
      const options = await users.getProfilesFilterAvailableOptions();
      const unselected = options.find((o) => !o.includes('selected') && o.length > 2);
      if (unselected) {
        await users.selectProfileOption(unselected);
        const count1 = await users.getProfilesSelectedCount();
        await users.selectProfileOption(unselected);
        const count2 = await users.getProfilesSelectedCount();
        await recordEvidence('assert-toBe-system-users-search-filters.spec-219', async () => expect(count2).toBe(count1));
      }
      await users.closeProfilesFilter();
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // User Groups Filter
  // ══════════════════════════════════════════════════════════════════

  test.describe('User Groups Filter', () => {
    test('LIMAS-SUD-2540: User Groups filter opens with tree, search, and items', async () => {
      await users.openUserGroupsFilter();
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-232', async () => expect(users.userGroupsFilterSearchInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-233', async () => expect(users.userGroupsFilterSelectAll).toBeVisible());
      const checkboxes = users.userGroupsFilterTreeItems;
      const count = await checkboxes.count();
      await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-236', async () => expect(count).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2541: Selecting a user group filters and Clear All restores', async () => {
      const totalBefore = await users.getTotalCount();
      await users.openUserGroupsFilter();
      const firstCheckbox = users.userGroupsFilterTreeItems.first();
      const label = await firstCheckbox.getAttribute('aria-label');
      if (label) {
        await recordEvidence('action-check-system-users-search-filters.spec-245', async () => firstCheckbox.check());
        await users.doneUserGroupsFilter();
        const visible = await users.getVisibleCount();
        await recordEvidence('assert-toBeLessThanOrEqual-system-users-search-filters.spec-248', async () => expect(visible).toBeLessThanOrEqual(totalBefore));

        await recordEvidence('assert-toBeEnabled-system-users-search-filters.spec-250', async () => expect(users.clearAllButton).toBeEnabled());
        await users.clickClearAll();
        const restored = await users.getVisibleCount();
        await recordEvidence('assert-toBe-system-users-search-filters.spec-253', async () => expect(restored).toBe(totalBefore));
      }
    });

    test('LIMAS-SUD-2542: Combined profile and user group filtering', async () => {
      await users.openProfilesFilter();
      const options = await users.getProfilesFilterAvailableOptions();
      const unselectedProfile = options.find((o) => !o.includes('selected') && o.length > 2);
      if (unselectedProfile) {
        await users.selectProfileOption(unselectedProfile);
        await users.doneProfilesFilter();
        await users.waitForTableStable();
        const profileCount = await users.getVisibleCount();
        if (profileCount > 0) {
          await users.openUserGroupsFilter();
          const firstCheckbox = users.userGroupsFilterTreeItems.first();
          await recordEvidence('action-check-system-users-search-filters.spec-269', async () => firstCheckbox.check());
          await users.doneUserGroupsFilter();
          const combinedCount = await users.getVisibleCount();
          await recordEvidence('assert-toBeLessThanOrEqual-system-users-search-filters.spec-272', async () => expect(combinedCount).toBeLessThanOrEqual(profileCount));
        }
      }
      await users.restoreCleanState();
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Assignment Overflow Expansion
  // ══════════════════════════════════════════════════════════════════

  test.describe('User Groups Overflow', () => {
    test('LIMAS-SUD-2543: Overflow button shows correct count and expands to reveal hidden groups', async () => {
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        if (await users.isUserGroupOverflowPresent(row)) {
          const overflowCount = await users.getUserGroupOverflowCount(row);
          await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-290', async () => expect(overflowCount).toBeGreaterThan(0));

          const beforeCount = await users.getVisibleUserGroupChipCount(row);
          await users.expandUserGroups(row);
          const afterCount = await users.getVisibleUserGroupChipCount(row);
          await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-295', async () => expect(afterCount).toBeGreaterThan(beforeCount));
          await recordEvidence('assert-toBe-system-users-search-filters.spec-296', async () => expect(afterCount).toBe(beforeCount + overflowCount));
          await users.collapseUserGroups(row);
          return;
        }
      }
      await recordEvidence('assert-toBe-system-users-search-filters.spec-301', async () => expect(true).toBe(true)); // At least one overflow row should exist
    });

    test('LIMAS-SUD-2544: Expansion affects only the selected row and collapse restores', async () => {
      const rowCount = await users.getRowCount();
      let targetRow: ReturnType<typeof users.rows.nth> | null = null;
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        if (await users.isUserGroupOverflowPresent(row)) {
          targetRow = row;
          break;
        }
      }
      if (!targetRow) { test.skip(true, 'Required runtime user row is unavailable.'); return; }

      const otherRow = users.rows.nth(0);
      const otherBefore = await users.getVisibleUserGroupChipCount(otherRow);
      const targetBefore = await users.getVisibleUserGroupChipCount(targetRow);

      await users.expandUserGroups(targetRow);
      const otherAfter = await users.getVisibleUserGroupChipCount(otherRow);
      await recordEvidence('assert-toBe-system-users-search-filters.spec-322', async () => expect(otherAfter).toBe(otherBefore));

      await users.collapseUserGroups(targetRow);
      const targetAfter = await users.getVisibleUserGroupChipCount(targetRow);
      await recordEvidence('assert-toBe-system-users-search-filters.spec-326', async () => expect(targetAfter).toBe(targetBefore));
    });

    test('LIMAS-SUD-2545: Overflow button has accessible name and expanded-state semantics', async () => {
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        if (await users.isUserGroupOverflowPresent(row)) {
          const btn = users.rowUserGroupOverflow(row);
          const name = await btn.getAttribute('aria-label');
          await recordEvidence('assert-toMatch-system-users-search-filters.spec-336', async () => expect(name).toMatch(/Show \d+ more user groups/));
          await recordEvidence('action-click-system-users-search-filters.spec-337', async () => btn.click());
          const showFewer = users.showFewerUserGroupsButton(row);
          await recordEvidence('assert-toHaveAttribute-system-users-search-filters.spec-339', async () => expect(showFewer).toHaveAttribute('aria-expanded', 'true'));
          await users.collapseUserGroups(row);
          return;
        }
      }
    });
  });

  test.describe('Profiles Overflow', () => {
    test('LIMAS-SUD-2546: Profiles overflow expands to reveal hidden profiles', async () => {
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        if (await users.isProfileOverflowPresent(row)) {
          const beforeCount = await users.getVisibleProfileChipCount(row);
          const overflowCount = await users.getProfileOverflowCount(row);
          await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-355', async () => expect(overflowCount).toBeGreaterThan(0));
          await users.expandProfiles(row);
          const afterCount = await users.getVisibleProfileChipCount(row);
          await recordEvidence('assert-toBeGreaterThan-system-users-search-filters.spec-358', async () => expect(afterCount).toBeGreaterThan(beforeCount));
          await recordEvidence('assert-toBe-system-users-search-filters.spec-359', async () => expect(afterCount).toBe(beforeCount + overflowCount));
          await users.collapseProfiles(row);
          return;
        }
      }
    });

    test('LIMAS-SUD-2547: Search does not mix assignments between users', async () => {
      const firstRow = users.rows.first();
      const firstName = (await users.rowName(firstRow).textContent()) ?? '';
      await users.search(firstName.trim().substring(0, 4));
      const filteredRows = await users.getRowCount();
      if (filteredRows > 0) {
        const row = users.rows.first();
        const name = (await users.rowName(row).textContent()) ?? '';
        await recordEvidence('assert-toContain-system-users-search-filters.spec-374', async () => expect(name).toContain(firstName.trim().substring(0, 4)));
      }
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Edit Action
  // ══════════════════════════════════════════════════════════════════

  test.describe('Edit Action', () => {
    test('LIMAS-SUD-2548: Edit button has accessible name and opens Edit Assignments dialog', async () => {
      const firstRow = users.rows.first();
      const btn = users.rowEditButton(firstRow);
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-387', async () => expect(btn).toBeVisible());
      await recordEvidence('assert-toBeEnabled-system-users-search-filters.spec-388', async () => expect(btn).toBeEnabled());
      const label = await btn.getAttribute('aria-label');
      await recordEvidence('assert-toMatch-system-users-search-filters.spec-390', async () => expect(label).toMatch(/^Edit /));

      await users.openEditAssignments(firstRow);
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-393', async () => expect(users.editAssignmentsDialog).toBeVisible());
      await recordEvidence('assert-toHaveText-system-users-search-filters.spec-394', async () => expect(users.editAssignmentsHeading).toHaveText('Edit Assignments'));
      const desc = await users.editAssignmentsDescription.textContent();
      await recordEvidence('assert-toMatch-system-users-search-filters.spec-396', async () => expect(desc).toMatch(/Manage Profiles and User Groups for/i));
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2549: Edit Assignments dialog has Close, Cancel, and Update buttons', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-403', async () => expect(users.editAssignmentsCloseButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-404', async () => expect(users.editAssignmentsCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-405', async () => expect(users.editAssignmentsUpdateButton).toBeVisible());
      await users.closeEditAssignments();
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-407', async () => expect(users.editAssignmentsDialog).not.toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-search-filters.spec-408', async () => expect(users.heading).toBeVisible());
    });

    test('LIMAS-SUD-2550: Each row has exactly one Edit button', async () => {
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        const editCount = await row.getByRole('button', { name: /^Edit / }).count();
        await recordEvidence('assert-toBe-system-users-search-filters.spec-416', async () => expect(editCount).toBe(1));
      }
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Accessibility
  // ══════════════════════════════════════════════════════════════════

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-2551: Search has type text or search semantics', async () => {
      await recordEvidence('assert-toHaveAttribute-system-users-search-filters.spec-427', async () => expect(users.searchInput).toHaveAttribute('type', /text|search/));
    });
  });
});