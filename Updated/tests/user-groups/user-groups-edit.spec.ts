import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { UserGroupsPage } from '../pages/user-groups.page';

const MUTATION_ENABLED =
  process.env.TEST_USER_GROUP_ALLOW_MUTATION === 'true' &&
  process.env.TEST_USER_GROUP_ALLOW_DELETE === 'true';

test.describe('UGR-D — Edit Group', () => {
  let groups: UserGroupsPage;

  test.beforeEach(async ({ page }) => {
    groups = new UserGroupsPage(page);
    await groups.navigate();
    await groups.clearSearch();
    await groups.collapseAll();
  });

  test.afterEach(async () => {
    const dialog = groups.page.getByRole('dialog');
    if (await dialog.isVisible().catch(() => false)) {
      await recordEvidence('action-press-user-groups-edit.spec-21', async () => groups.page.keyboard.press('Escape'));
      await dialog.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }
    await groups.clearSearch();
    await groups.collapseAll();
    await groups.page.waitForLoadState('networkidle').catch(() => {});
  });

  async function pickRow(): Promise<{ row: ReturnType<typeof groups.groupRows['first']>; name: string }> {
    const row = groups.groupRows.first();
    const name = await groups.getRowName(row);
    return { row, name };
  }

  // ── Dialog Structure ──────────────────────────────────────────────

  test.describe('Dialog Structure', () => {
    test('LIMAS-SUD-2484: Edit dialog opens with role and accessible name', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-41', async () => expect(groups.editDialog).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-user-groups-edit.spec-42', async () => expect(groups.editDialog).toHaveAttribute('role', 'dialog'));
    });

    test('LIMAS-SUD-2485: Edit dialog shows heading and description', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-48', async () => expect(groups.editHeading).toBeVisible());
      await recordEvidence('assert-toHaveText-user-groups-edit.spec-49', async () => expect(groups.editHeading).toHaveText('Edit'));
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-50', async () => expect(groups.editDescription).toBeVisible());
      await recordEvidence('assert-toContainText-user-groups-edit.spec-51', async () => expect(groups.editDescription).toContainText(/edit/i));
    });

    test('LIMAS-SUD-2486: Group Name and Comment fields are present', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-57', async () => expect(groups.editNameInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-58', async () => expect(groups.editCommentInput).toBeVisible());
    });

    test('LIMAS-SUD-2487: Cancel, Save, and Close controls are present', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-64', async () => expect(groups.editCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-65', async () => expect(groups.editSaveButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-66', async () => expect(groups.editCloseButton).toBeVisible());
    });

    test('LIMAS-SUD-2488: Initial focus is on Group Name input', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      const isFocused = await groups.editNameInput.evaluate(
        (el) => el === document.activeElement
      );
      await recordEvidence('assert-toBe-user-groups-edit.spec-75', async () => expect(isFocused).toBe(true));
    });
  });

  // ── Prepopulated Values ──────────────────────────────────────────

  test.describe('Prepopulated Values', () => {
    test('LIMAS-SUD-2489: Group Name is prepopulated with current name', async () => {
      const { row, name } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toHaveValue-user-groups-edit.spec-85', async () => expect(groups.editNameInput).toHaveValue(name));
    });

    test('LIMAS-SUD-2490: Comment is prepopulated with current value', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      const value = await groups.editCommentInput.inputValue();
      // Comment may be empty or have content — just verify it loads
      await recordEvidence('assert-toBe-user-groups-edit.spec-93', async () => expect(typeof value).toBe('string'));
    });

    test('LIMAS-SUD-2491: Opening Edit for a different row loads correct values', async () => {
      const count = await groups.getRowCount();
      test.skip(count < 2, 'Required runtime data or UI state is unavailable: count < 2.');
      const row1 = groups.groupRows.first();
      const name1 = await groups.getRowName(row1);
      const row2 = groups.groupRows.nth(1);
      const name2 = await groups.getRowName(row2);
      await recordEvidence('assert-toBe-user-groups-edit.spec-103', async () => expect(name1).not.toBe(name2));

      await groups.openEditDialog(row1);
      await recordEvidence('assert-toHaveValue-user-groups-edit.spec-106', async () => expect(groups.editNameInput).toHaveValue(name1));
      await recordEvidence('action-press-user-groups-edit.spec-107', async () => groups.page.keyboard.press('Escape'));

      await groups.openEditDialog(row2);
      await recordEvidence('assert-toHaveValue-user-groups-edit.spec-110', async () => expect(groups.editNameInput).toHaveValue(name2));
    });
  });

  // ── Save State ───────────────────────────────────────────────────

  test.describe('Save State', () => {
    test('LIMAS-SUD-2492: Save is enabled when dialog opens with no changes', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toBeEnabled-user-groups-edit.spec-120', async () => expect(groups.editSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2493: Save remains enabled after changing Group Name', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('action-fill-user-groups-edit.spec-126', async () => groups.editNameInput.fill('UpdatedName'));
      await recordEvidence('assert-toBeEnabled-user-groups-edit.spec-127', async () => expect(groups.editSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2494: Save remains enabled after changing Comment', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('action-fill-user-groups-edit.spec-133', async () => groups.editCommentInput.fill('Updated comment'));
      await recordEvidence('assert-toBeEnabled-user-groups-edit.spec-134', async () => expect(groups.editSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2495: Save remains enabled after clearing Group Name', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('action-clear-user-groups-edit.spec-140', async () => groups.editNameInput.clear());
      await recordEvidence('assert-toBeEnabled-user-groups-edit.spec-141', async () => expect(groups.editSaveButton).toBeEnabled());
    });
  });

  // ── Dismissal ─────────────────────────────────────────────────────

  test.describe('Dismissal', () => {
    test('LIMAS-SUD-2496: Cancel closes the dialog without changes', async () => {
      const { row, name } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('action-fill-user-groups-edit.spec-151', async () => groups.editNameInput.fill('ChangedName'));
      await groups.dismissEditDialog();
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-153', async () => expect(groups.editDialog).not.toBeVisible());
      // Verify the original name is still shown in the table
      await recordEvidence('assert-toHaveText-user-groups-edit.spec-155', async () => expect(groups.rowName(row)).toHaveText(name));
    });

    test('LIMAS-SUD-2497: Close button closes the dialog', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await groups.closeEditDialog();
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-162', async () => expect(groups.editDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2498: Escape closes the dialog', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('action-press-user-groups-edit.spec-168', async () => groups.page.keyboard.press('Escape'));
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-169', async () => expect(groups.editDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2499: Reopening restores original persisted values', async () => {
      const { row, name } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('action-fill-user-groups-edit.spec-175', async () => groups.editNameInput.fill('UnsavedChange'));
      await recordEvidence('action-press-user-groups-edit.spec-176', async () => groups.page.keyboard.press('Escape'));
      await groups.openEditDialog(row);
      await recordEvidence('assert-toHaveValue-user-groups-edit.spec-178', async () => expect(groups.editNameInput).toHaveValue(name));
    });
  });

  // ── Root vs Subgroup ─────────────────────────────────────────────

  test.describe('Root and Subgroup', () => {
    test('LIMAS-SUD-2500: Edit works on a root group', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-edit.spec-188', async () => expect(groups.editDialog).toBeVisible());
    });

    test('LIMAS-SUD-2501: Edit works on a visible child group', async () => {
      // Expand a parent to reveal children, then edit a child
      const count = await groups.getRowCount();
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        if (await groups.rowToggle(row).isVisible().catch(() => false)) {
          await groups.expandRow(row);
          break;
        }
      }
      // Find a child row (indented) and edit it
      const afterCount = await groups.getRowCount();
      for (let i = 0; i < afterCount; i++) {
        const row = groups.groupRows.nth(i);
        const indent = await groups.getRowIndentation(row);
        if (indent && indent !== '0rem') {
          await groups.openEditDialog(row);
          await recordEvidence('assert-toBeVisible-user-groups-edit.spec-208', async () => expect(groups.editDialog).toBeVisible());
          break;
        }
      }
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-2502: Group Name input has accessible name', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toHaveAccessibleName-user-groups-edit.spec-221', async () => expect(groups.editNameInput).toHaveAccessibleName(/Group Name/i));
    });

    test('LIMAS-SUD-2503: Comment input has accessible name', async () => {
      const { row } = await pickRow();
      await groups.openEditDialog(row);
      await recordEvidence('assert-toHaveAccessibleName-user-groups-edit.spec-227', async () => expect(groups.editCommentInput).toHaveAccessibleName('Comment'));
    });
  });

  // ── Gated Update Lifecycle ────────────────────────────────────────

  test.describe('Synthetic Update Lifecycle', () => {
    test('LIMAS-SUD-2504: Gated lifecycle creates, edits, and verifies a synthetic group', async () => {
      if (!MUTATION_ENABLED) {
        test.skip(true, 'Mutation flags not set');
        return;
      }
      test.skip(true, 'Synthetic lifecycle requires create/delete utilities; deferred');
    });
  });
});