import { exerciseSystemUserAssignments } from '../helpers/system-user-crud';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUsersPage } from '../pages/system-users.page';

test.describe('SYU-B — Edit System User Assignments', () => {
  let users: SystemUsersPage;

  test.beforeEach(async ({ page }) => {
    users = new SystemUsersPage(page);
    await users.navigate();
    await users.waitForTableStable();
    await users.restoreCleanState();
  });

  test.afterEach(async () => {
    // Ensure any open dialog is closed
    const dialogVisible = await users.isEditAssignmentsDialogVisible();
    if (dialogVisible) {
      await users.closeEditAssignments().catch(() => {});
    }
    await users.restoreCleanState();
  });

  // ══════════════════════════════════════════════════════════════════
  // Dialog Shell
  // ══════════════════════════════════════════════════════════════════

  test.describe('Dialog Shell', () => {
    test('LIMAS-SUD-2552: Dialog opens with heading, description, and selected-user text', async () => {
      const firstRow = users.rows.first();
      const userName = (await users.rowName(firstRow).textContent()) ?? '';
      await users.openEditAssignments(firstRow);

      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-33', async () => expect(users.editAssignmentsDialog).toBeVisible());
      await recordEvidence('assert-toHaveText-system-users-edit-assignments.spec-34', async () => expect(users.editAssignmentsHeading).toHaveText('Edit Assignments'));
      const desc = await users.editAssignmentsDescription.textContent();
      await recordEvidence('assert-toContain-system-users-edit-assignments.spec-36', async () => expect(desc).toContain('Manage Profiles and User Groups for'));
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2553: Dialog has Close, Cancel, and Update buttons', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-43', async () => expect(users.editAssignmentsCloseButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-44', async () => expect(users.editAssignmentsCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-45', async () => expect(users.editAssignmentsUpdateButton).toBeVisible());
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2554: Profiles and User Groups sections are present with labels', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-52', async () => expect(users.editAssignmentsProfilesCombobox).toBeVisible());
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-53', async () => expect(users.editAssignmentsUserGroupsCombobox).toBeVisible());
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2555: Initial focus is on the Profiles combobox', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      await recordEvidence('assert-toBeFocused-system-users-edit-assignments.spec-60', async () => expect(users.editAssignmentsProfilesCombobox).toBeFocused());
      await users.closeEditAssignments();
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Prepopulated Assignments
  // ══════════════════════════════════════════════════════════════════

  test.describe('Prepopulated Assignments', () => {
    test('LIMAS-SUD-2556: Existing Profiles in dialog match the selected row', async () => {
      // Find a row with at least one profile
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        const profileText = (await row.locator('td').nth(3).textContent()) ?? '';
        if (!profileText.includes('No profiles')) {
          await users.openEditAssignments(row);
          const chipNames = await users.getDialogProfileChipNames();
          await recordEvidence('assert-toBeGreaterThan-system-users-edit-assignments.spec-79', async () => expect(chipNames.length).toBeGreaterThan(0));
          // At least one chip name should appear in the row profile text
          const someMatch = chipNames.some((c) => profileText.includes(c));
          await recordEvidence('assert-toBe-system-users-edit-assignments.spec-82', async () => expect(someMatch).toBe(true));
          await users.closeEditAssignments();
          return;
        }
      }
      test.skip(true, 'No user with the required assignment data exists in the current table.');
    });

    test('LIMAS-SUD-2557: Existing User Groups in dialog match the selected row', async () => {
      // Find a row with visible user groups
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        const groupText = (await row.locator('td').nth(2).textContent()) ?? '';
        if (!groupText.includes('No groups') && groupText.trim().length > 0) {
          await users.openEditAssignments(row);
          const chipNames = await users.getDialogUserGroupChipNames();
          // At least one group chip name should appear in the row text
          const someMatch = chipNames.length > 0 && chipNames.some((c) => groupText.includes(c));
          await recordEvidence('assert-toBe-system-users-edit-assignments.spec-100', async () => expect(someMatch).toBe(true));
          await users.closeEditAssignments();
          return;
        }
      }
      test.skip(true, 'No user with the required assignment data exists in the current table.');
    });

    test('LIMAS-SUD-2558: No assignments from another user appear in dialog', async () => {
      const rowsToTest = Math.min(2, await users.getRowCount());
      test.skip(rowsToTest < 2, 'Required runtime data or UI state is unavailable: rowsToTest < 2.');
      const rowA = users.rows.nth(0);
      const rowB = users.rows.nth(1);
      const nameB = (await users.rowName(rowB).textContent()) ?? '';

      await users.openEditAssignments(rowA);
      const desc = await users.editAssignmentsDescription.textContent();
      await recordEvidence('assert-toContain-system-users-edit-assignments.spec-116', async () => expect(desc).not.toContain(nameB.trim()));
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2559: No duplicate chips in dialog assignment lists', async () => {
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        await users.openEditAssignments(row);
        const profiles = await users.getDialogProfileChipNames();
        const profileSet = new Set(profiles);
        await recordEvidence('assert-toBe-system-users-edit-assignments.spec-127', async () => expect(profileSet.size).toBe(profiles.length));
        const groups = await users.getDialogUserGroupChipNames();
        const groupSet = new Set(groups);
        await recordEvidence('assert-toBe-system-users-edit-assignments.spec-130', async () => expect(groupSet.size).toBe(groups.length));
        await users.closeEditAssignments();
        break; // one row is sufficient
      }
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Profile Assignments
  // ══════════════════════════════════════════════════════════════════

  test.describe('Profile Assignments', () => {
    test('LIMAS-SUD-2560: Profiles selection opens with runtime options', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      await users.openProfilesSelection();
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-146', async () => expect(users.editAssignmentsSelectionListbox).toBeVisible());
      const options = await users.getSelectionAvailableOptions();
      await recordEvidence('assert-toBeGreaterThan-system-users-edit-assignments.spec-148', async () => expect(options.length).toBeGreaterThan(0));
      await users.closeSelectionDialog();
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2561: Selecting and deselecting a profile updates the assignment chips', async () => {
      await users.openEditAssignments(users.rows.first());
      const before = await users.getDialogProfileChipNames();
      await users.openProfilesSelection();
      const options = await users.getSelectionAvailableOptions();
      const toAdd = options.find(name => !before.includes(name));
      test.skip(!toAdd, 'No unassigned profile exists in the available runtime data.');
      await users.selectOptionInDialog(toAdd!);
      await users.doneSelection();
      await recordEvidence('assert-toEqual-system-users-edit-assignments.spec-166', async () => expect.poll(() => users.getDialogProfileChipNames()).toEqual(expect.arrayContaining([...before, toAdd])));
      await recordEvidence('assert-toHaveLength-system-users-edit-assignments.spec-167', async () => expect(await users.getDialogProfileChipNames()).toHaveLength(before.length + 1));
      await users.openProfilesSelection();
      await users.selectOptionInDialog(toAdd!);
      await users.doneSelection();
      await recordEvidence('assert-toEqual-system-users-edit-assignments.spec-171', async () => expect((await users.getDialogProfileChipNames()).sort()).toEqual([...before].sort()));
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2562: Repeated profile selection toggles without duplicate chips', async () => {
      await users.openEditAssignments(users.rows.first());
      const before = await users.getDialogProfileChipNames();
      await users.openProfilesSelection();
      const options = await users.getSelectionAvailableOptions();
      test.skip(options.length === 0, 'No profile options exist in the runtime data.');
      const option = options[0];
      const originalCount = await users.getSelectionSelectedCount();
      await users.selectOptionInDialog(option);
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-184', async () => expect(await users.getSelectionSelectedCount()).toBe(originalCount + (before.includes(option) ? -1 : 1)));
      await users.selectOptionInDialog(option);
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-186', async () => expect(await users.getSelectionSelectedCount()).toBe(originalCount));
      await users.doneSelection();
      const after = await users.getDialogProfileChipNames();
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-189', async () => expect(after.length).toBe(new Set(after).size));
      await recordEvidence('assert-toEqual-system-users-edit-assignments.spec-190', async () => expect(after.sort()).toEqual([...before].sort()));
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2563: Escape closes the selection popover without applying changes', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      const beforeChips = await users.getDialogProfileChipNames();
      await users.openProfilesSelection();
      await users.closeSelectionDialog();
      const afterChips = await users.getDialogProfileChipNames();
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-216', async () => expect(afterChips.length).toBe(beforeChips.length));
      await users.closeEditAssignments();
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // User Group Assignments
  // ══════════════════════════════════════════════════════════════════

  test.describe('User Group Assignments', () => {
    test('LIMAS-SUD-2564: User Groups selection opens with runtime options', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      await users.openUserGroupsSelection();
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-230', async () => expect(users.editAssignmentsSelectionListbox).toBeVisible());
      const options = await users.getSelectionAvailableOptions();
      await recordEvidence('assert-toBeGreaterThan-system-users-edit-assignments.spec-232', async () => expect(options.length).toBeGreaterThan(0));
      await users.closeSelectionDialog();
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2565: Selecting and deselecting a usergroup updates the assignment chips', async () => {
      await users.openEditAssignments(users.rows.first());
      const before = await users.getDialogUserGroupChipNames();
      await users.openUserGroupsSelection();
      const options = await users.getSelectionAvailableOptions();
      const toAdd = options.find(name => !before.includes(name));
      test.skip(!toAdd, 'No unassigned usergroup exists in the available runtime data.');
      await users.selectOptionInDialog(toAdd!);
      await users.doneSelection();
      await recordEvidence('assert-toEqual-system-users-edit-assignments.spec-231', async () => expect.poll(() => users.getDialogUserGroupChipNames()).toEqual(expect.arrayContaining([...before, toAdd])));
      await recordEvidence('assert-toHaveLength-system-users-edit-assignments.spec-232', async () => expect(await users.getDialogUserGroupChipNames()).toHaveLength(before.length + 1));
      await users.openUserGroupsSelection();
      await users.selectOptionInDialog(toAdd!);
      await users.doneSelection();
      await recordEvidence('assert-toEqual-system-users-edit-assignments.spec-236', async () => expect((await users.getDialogUserGroupChipNames()).sort()).toEqual([...before].sort()));
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2566: Repeated usergroup selection toggles without duplicate chips', async () => {
      await users.openEditAssignments(users.rows.first());
      const before = await users.getDialogUserGroupChipNames();
      await users.openUserGroupsSelection();
      const options = await users.getSelectionAvailableOptions();
      test.skip(options.length === 0, 'No usergroup options exist in the runtime data.');
      const option = options[0];
      const originalCount = await users.getSelectionSelectedCount();
      await users.selectOptionInDialog(option);
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-249', async () => expect(await users.getSelectionSelectedCount()).toBe(originalCount + (before.includes(option) ? -1 : 1)));
      await users.selectOptionInDialog(option);
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-251', async () => expect(await users.getSelectionSelectedCount()).toBe(originalCount));
      await users.doneSelection();
      const after = await users.getDialogUserGroupChipNames();
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-254', async () => expect(after.length).toBe(new Set(after).size));
      await recordEvidence('assert-toEqual-system-users-edit-assignments.spec-255', async () => expect(after.sort()).toEqual([...before].sort()));
      await users.closeEditAssignments();
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Update State
  // ══════════════════════════════════════════════════════════════════

  test.describe('Update State', () => {
    test('LIMAS-SUD-2567: Update button is enabled when dialog opens with no changes', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      await recordEvidence('assert-toBeEnabled-system-users-edit-assignments.spec-300', async () => expect(users.editAssignmentsUpdateButton).toBeEnabled());
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2568: Update remains enabled after adding a profile', async () => {
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        const profileText = (await row.locator('td').nth(3).textContent()) ?? '';
        if (profileText.includes('No profiles')) {
          await users.openEditAssignments(row);
          await users.openProfilesSelection();
          const options = await users.getSelectionAvailableOptions();
          const unselected = options.filter((o) => !o.includes('selected'));
          if (unselected.length > 0) {
            await users.selectOptionInDialog(unselected[0]);
            await users.doneSelection();
            await recordEvidence('assert-toBeEnabled-system-users-edit-assignments.spec-317', async () => expect(users.editAssignmentsUpdateButton).toBeEnabled());
            // Revert: remove it
            await users.openProfilesSelection();
            await users.selectOptionInDialog(unselected[0]);
            await users.doneSelection();
          } else {
            await users.closeSelectionDialog();
          }
          await users.closeEditAssignments();
          return;
        }
      }
      test.skip(true, 'No user with the required assignment data exists in the current table.');
    });

    test('LIMAS-SUD-2569: Update remains enabled after removing a profile', async () => {
      // Find a row with at least one profile
      const rowCount = await users.getRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = users.rows.nth(i);
        const profileText = (await row.locator('td').nth(3).textContent()) ?? '';
        if (!profileText.includes('No profiles')) {
          await users.openEditAssignments(row);
          const beforeChips = await users.getDialogProfileChipNames();
          if (beforeChips.length > 0) {
            await users.openProfilesSelection();
            await users.selectOptionInDialog(beforeChips[0]);
            await users.doneSelection();
            await recordEvidence('assert-toBeEnabled-system-users-edit-assignments.spec-344', async () => expect(users.editAssignmentsUpdateButton).toBeEnabled());
            // Revert
            await users.openProfilesSelection();
            await users.selectOptionInDialog(beforeChips[0]);
            await users.doneSelection();
          }
          await users.closeEditAssignments();
          return;
        }
      }
      test.skip(true, 'No user with the required assignment data exists in the current table.');
    });

    test('LIMAS-SUD-2570: Reverting all changes keeps Update enabled', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      const initialProfiles = await users.getDialogProfileChipNames();
      const initialGroups = await users.getDialogUserGroupChipNames();

      // Add then remove a profile if possible
      await users.openProfilesSelection();
      const options = await users.getSelectionAvailableOptions();
      const unselected = options.filter((o) => !o.includes('selected'));
      if (unselected.length > 0) {
        await users.selectOptionInDialog(unselected[0]);
        await users.doneSelection();
        await users.openProfilesSelection();
        await users.selectOptionInDialog(unselected[0]);
        await users.doneSelection();
      } else {
        await users.closeSelectionDialog();
      }

      const finalProfiles = await users.getDialogProfileChipNames();
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-377', async () => expect(finalProfiles.length).toBe(initialProfiles.length));
      await recordEvidence('assert-toBeEnabled-system-users-edit-assignments.spec-378', async () => expect(users.editAssignmentsUpdateButton).toBeEnabled());
      await users.closeEditAssignments();
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Dismissal
  // ══════════════════════════════════════════════════════════════════

  test.describe('Dismissal', () => {
    test('LIMAS-SUD-2571: Cancel closes the dialog without changes and reopens with original values', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      const originalProfiles = await users.getDialogProfileChipNames();
      const originalGroups = await users.getDialogUserGroupChipNames();

      // Try to add a profile without saving
      await users.openProfilesSelection();
      const options = await users.getSelectionAvailableOptions();
      const unselected = options.filter((o) => !o.includes('selected'));
      if (unselected.length > 0) {
        await users.selectOptionInDialog(unselected[0]);
        await users.doneSelection();
      } else {
        await users.closeSelectionDialog();
      }

      await users.cancelEditAssignments();
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-406', async () => expect(users.editAssignmentsDialog).not.toBeVisible());

      // Reopen and verify original values
      await users.openEditAssignments(firstRow);
      const reopenedProfiles = await users.getDialogProfileChipNames();
      const reopenedGroups = await users.getDialogUserGroupChipNames();
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-412', async () => expect(reopenedProfiles.length).toBe(originalProfiles.length));
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-413', async () => expect(reopenedGroups.length).toBe(originalGroups.length));
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2572: Close closes the dialog without changes', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      await users.closeEditAssignments();
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-421', async () => expect(users.editAssignmentsDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2573: Escape dismisses the dialog and reopens with original values', async () => {
      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);
      const originalProfiles = await users.getDialogProfileChipNames();

      await users.dismissEditAssignmentsByEscape();
      await recordEvidence('assert-toBeVisible-system-users-edit-assignments.spec-430', async () => expect(users.editAssignmentsDialog).not.toBeVisible());

      await users.openEditAssignments(firstRow);
      const reopenedProfiles = await users.getDialogProfileChipNames();
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-434', async () => expect(reopenedProfiles.length).toBe(originalProfiles.length));
      await users.closeEditAssignments();
    });

    test('LIMAS-SUD-2574: No update request is sent before Update is clicked', async () => {
      // Track network requests for non-GET methods
      const mutations: string[] = [];
      users.page.on('request', (req) => {
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) {
          mutations.push(`${req.method()} ${req.url()}`);
        }
      });

      const firstRow = users.rows.first();
      await users.openEditAssignments(firstRow);

      // Try adding and removing a profile (without Update)
      await users.openProfilesSelection();
      const options = await users.getSelectionAvailableOptions();
      const unselected = options.filter((o) => !o.includes('selected'));
      if (unselected.length > 0) {
        await users.selectOptionInDialog(unselected[0]);
        await users.doneSelection();
        await users.openProfilesSelection();
        await users.selectOptionInDialog(unselected[0]);
        await users.doneSelection();
      } else {
        await users.closeSelectionDialog();
      }

      await users.closeEditAssignments();

      // No mutation requests should have been sent
      await recordEvidence('assert-toBe-system-users-edit-assignments.spec-467', async () => expect(mutations.length).toBe(0));
    });
  });

  // ══════════════════════════════════════════════════════════════════
  // Gated Lifecycle
  // ══════════════════════════════════════════════════════════════════

  test.describe('Saved assignment lifecycle', () => {
    test('LIMAS-SUD-2575: Saves a temporary assignment, verifies persistence, and restores the test user', async () => {
      test.setTimeout(240000);
      await exerciseSystemUserAssignments(users);
    });
  });
});
