import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { UserGroupsPage } from '../pages/user-groups.page';

const MUTATION_ENABLED =
  process.env.TEST_USER_GROUP_ALLOW_MUTATION === 'true' &&
  process.env.TEST_USER_GROUP_ALLOW_DELETE === 'true';

test.describe('UGR-C — Add Subgroup', () => {
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
      await recordEvidence('action-press-user-groups-add-subgroup.spec-21', async () => groups.page.keyboard.press('Escape'));
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
    test('LIMAS-SUD-2463: Add Subgroup dialog opens with accessible name', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-41', async () => expect(groups.addSubgroupDialog).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-user-groups-add-subgroup.spec-42', async () => expect(groups.addSubgroupDialog).toHaveAttribute('role', 'dialog'));
    });

    test('LIMAS-SUD-2464: Dialog heading and description indicate subgroup', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-48', async () => expect(groups.addSubgroupHeading).toBeVisible());
      await recordEvidence('assert-toHaveText-user-groups-add-subgroup.spec-49', async () => expect(groups.addSubgroupHeading).toHaveText('Add Subgroup'));
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-50', async () => expect(groups.addSubgroupDescription).toBeVisible());
      await recordEvidence('assert-toContainText-user-groups-add-subgroup.spec-51', async () => expect(groups.addSubgroupDescription).toContainText(/subgroup/i));
    });

    test('LIMAS-SUD-2465: Group Name and Comment fields are present', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-57', async () => expect(groups.addSubgroupNameInput).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-user-groups-add-subgroup.spec-58', async () => expect(groups.addSubgroupNameInput).toHaveAttribute('placeholder', 'Enter group name'));
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-59', async () => expect(groups.addSubgroupCommentInput).toBeVisible());
    });

    test('LIMAS-SUD-2466: Cancel, Save, and Close controls are present', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-65', async () => expect(groups.addSubgroupCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-66', async () => expect(groups.addSubgroupSaveButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-67', async () => expect(groups.addSubgroupCloseButton).toBeVisible());
    });

    test('LIMAS-SUD-2467: Initial focus is on Group Name input', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      const isFocused = await groups.addSubgroupNameInput.evaluate(
        (el) => el === document.activeElement
      );
      await recordEvidence('assert-toBe-user-groups-add-subgroup.spec-76', async () => expect(isFocused).toBe(true));
    });

    test('LIMAS-SUD-2468: Dialog differs from Add Group in name and description', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toHaveText-user-groups-add-subgroup.spec-82', async () => expect(groups.addSubgroupHeading).toHaveText('Add Subgroup'));
      await recordEvidence('assert-toContainText-user-groups-add-subgroup.spec-83', async () => expect(groups.addSubgroupDescription).not.toContainText(/new group/i));
    });
  });

  // ── Parent Context ────────────────────────────────────────────────

  test.describe('Parent Context', () => {
    test('LIMAS-SUD-2469: Add Subgroup opens from different parent rows', async () => {
      const count = await groups.getRowCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-user-groups-add-subgroup.spec-92', async () => expect(count).toBeGreaterThanOrEqual(2));
      const row1 = groups.groupRows.first();
      await groups.openAddSubgroupDialog(row1);
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-95', async () => expect(groups.addSubgroupDialog).toBeVisible());
      await recordEvidence('action-press-user-groups-add-subgroup.spec-96', async () => groups.page.keyboard.press('Escape'));

      const row2 = groups.groupRows.nth(1);
      await groups.openAddSubgroupDialog(row2);
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-100', async () => expect(groups.addSubgroupDialog).toBeVisible());
    });

    test('LIMAS-SUD-2470: Add Subgroup button has accessible name', async () => {
      const { row } = await pickRow();
      const btn = groups.rowAddSubgroup(row);
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-106', async () => expect(btn).toBeVisible());
      await recordEvidence('assert-toHaveText-user-groups-add-subgroup.spec-107', async () => expect(btn).toHaveText(/Add Subgroup/i));
    });

    test('LIMAS-SUD-2471: Add Subgroup button remains enabled after dialog dismissal', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('action-press-user-groups-add-subgroup.spec-113', async () => groups.page.keyboard.press('Escape'));
      const btn = groups.rowAddSubgroup(row);
      await recordEvidence('assert-toBeEnabled-user-groups-add-subgroup.spec-115', async () => expect(btn).toBeEnabled());
    });
  });

  // ── Group Name Validation ────────────────────────────────────────

  test.describe('Group Name', () => {
    test('LIMAS-SUD-2472: Save is enabled when Group Name is empty', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toBeEnabled-user-groups-add-subgroup.spec-125', async () => expect(groups.addSubgroupSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2473: Save remains enabled with whitespace-only name', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('action-fill-user-groups-add-subgroup.spec-131', async () => groups.addSubgroupNameInput.fill('   '));
      await recordEvidence('assert-toBeEnabled-user-groups-add-subgroup.spec-132', async () => expect(groups.addSubgroupSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2474: Name preserves leading and trailing spaces', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('action-fill-user-groups-add-subgroup.spec-138', async () => groups.addSubgroupNameInput.fill('  SubName  '));
      const value = await groups.addSubgroupNameInput.inputValue();
      await recordEvidence('assert-toBe-user-groups-add-subgroup.spec-140', async () => expect(value).toBe('  SubName  '));
    });

    test('LIMAS-SUD-2475: Clearing restores Save to enabled', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('action-fill-user-groups-add-subgroup.spec-146', async () => groups.addSubgroupNameInput.fill('SubGroup'));
      await recordEvidence('action-clear-user-groups-add-subgroup.spec-147', async () => groups.addSubgroupNameInput.clear());
      await recordEvidence('assert-toBeEnabled-user-groups-add-subgroup.spec-148', async () => expect(groups.addSubgroupSaveButton).toBeEnabled());
    });
  });

  // ── Dismissal ─────────────────────────────────────────────────────

  test.describe('Dismissal', () => {
    test('LIMAS-SUD-2476: Cancel closes the dialog', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await groups.dismissAddSubgroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-159', async () => expect(groups.addSubgroupDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2477: Close button closes the dialog', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await groups.closeAddSubgroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-166', async () => expect(groups.addSubgroupDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2478: Escape closes the dialog', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('action-press-user-groups-add-subgroup.spec-172', async () => groups.page.keyboard.press('Escape'));
      await recordEvidence('assert-toBeVisible-user-groups-add-subgroup.spec-173', async () => expect(groups.addSubgroupDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2479: Reopening resets fields', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('action-fill-user-groups-add-subgroup.spec-179', async () => groups.addSubgroupNameInput.fill('PreviousSubName'));
      await recordEvidence('action-press-user-groups-add-subgroup.spec-180', async () => groups.page.keyboard.press('Escape'));
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toHaveValue-user-groups-add-subgroup.spec-182', async () => expect(groups.addSubgroupNameInput).toHaveValue(''));
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-2480: Group Name input has accessible name', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toHaveAccessibleName-user-groups-add-subgroup.spec-192', async () => expect(groups.addSubgroupNameInput).toHaveAccessibleName(/Group Name/i));
    });

    test('LIMAS-SUD-2481: Comment input has accessible name', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toHaveAccessibleName-user-groups-add-subgroup.spec-198', async () => expect(groups.addSubgroupCommentInput).toHaveAccessibleName('Comment'));
    });

    test('LIMAS-SUD-2482: Buttons have accessible names', async () => {
      const { row } = await pickRow();
      await groups.openAddSubgroupDialog(row);
      await recordEvidence('assert-toHaveAccessibleName-user-groups-add-subgroup.spec-204', async () => expect(groups.addSubgroupCancelButton).toHaveAccessibleName('Cancel'));
      await recordEvidence('assert-toHaveAccessibleName-user-groups-add-subgroup.spec-205', async () => expect(groups.addSubgroupSaveButton).toHaveAccessibleName('Save'));
    });
  });

  // ── Gated Create Lifecycle ────────────────────────────────────────

  test.describe('Synthetic Create Lifecycle', () => {
    test('LIMAS-SUD-2483: Gated lifecycle creates, verifies, and deletes a synthetic subgroup', async () => {
      if (!MUTATION_ENABLED) {
        test.skip(true, 'Mutation flags not set');
        return;
      }
      test.skip(true, 'Synthetic lifecycle requires delete utilities; deferred');
    });
  });
});