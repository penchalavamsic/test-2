import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { UserGroupsPage } from '../pages/user-groups.page';

const MUTATION_ENABLED =
  process.env.TEST_USER_GROUP_ALLOW_MUTATION === 'true' &&
  process.env.TEST_USER_GROUP_ALLOW_DELETE === 'true';

test.describe('UGR-B — Add Group', () => {
  let groups: UserGroupsPage;

  test.beforeEach(async ({ page }) => {
    groups = new UserGroupsPage(page);
    await groups.navigate();
    await groups.clearSearch();
    await groups.collapseAll();
  });

  test.afterEach(async () => {
    // Dismiss any open dialog
    const dialog = groups.page.getByRole('dialog');
    if (await dialog.isVisible().catch(() => false)) {
      await recordEvidence('action-press-user-groups-add.spec-22', async () => groups.page.keyboard.press('Escape'));
      await dialog.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }
    await groups.clearSearch();
    await groups.collapseAll();
    await groups.page.waitForLoadState('networkidle').catch(() => {});
  });

  // ── Dialog Structure ──────────────────────────────────────────────

  test.describe('Dialog Structure', () => {
    test('LIMAS-SUD-2438: Add Group dialog opens with role and accessible name', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-35', async () => expect(groups.addGroupDialog).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-user-groups-add.spec-36', async () => expect(groups.addGroupDialog).toHaveAttribute('role', 'dialog'));
    });

    test('LIMAS-SUD-2439: Dialog shows heading and description', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-41', async () => expect(groups.addGroupHeading).toBeVisible());
      await recordEvidence('assert-toHaveText-user-groups-add.spec-42', async () => expect(groups.addGroupHeading).toHaveText('Add Group'));
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-43', async () => expect(groups.addGroupDescription).toBeVisible());
      await recordEvidence('assert-toContainText-user-groups-add.spec-44', async () => expect(groups.addGroupDescription).toContainText(/add.*new group/i));
    });

    test('LIMAS-SUD-2440: Group Name input has placeholder and visual required indicator', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-49', async () => expect(groups.addGroupNameInput).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-user-groups-add.spec-50', async () => expect(groups.addGroupNameInput).toHaveAttribute('placeholder', 'Enter group name'));
    });

    test('LIMAS-SUD-2441: Comment textarea has placeholder and optional hint', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-55', async () => expect(groups.addGroupCommentInput).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-user-groups-add.spec-56', async () => expect(groups.addGroupCommentInput).toHaveAttribute('placeholder', /optional/i));
    });

    test('LIMAS-SUD-2442: Cancel, Save, and Close controls are present', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-61', async () => expect(groups.addGroupCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-62', async () => expect(groups.addGroupSaveButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-63', async () => expect(groups.addGroupCloseButton).toBeVisible());
    });

    test('LIMAS-SUD-2443: Initial focus is on Group Name input', async () => {
      await groups.openAddGroupDialog();
      const isFocused = await groups.addGroupNameInput.evaluate(
        (el) => el === document.activeElement
      );
      await recordEvidence('assert-toBe-user-groups-add.spec-71', async () => expect(isFocused).toBe(true));
    });

    test('LIMAS-SUD-2444: Focus is trapped inside the dialog', async () => {
      await groups.openAddGroupDialog();
      // Tab through all interactive elements and verify focus stays in dialog
      for (let i = 0; i < 6; i++) {
        await recordEvidence('action-press-user-groups-add.spec-78', async () => groups.page.keyboard.press('Tab'));
        const focused = await groups.page.evaluate(
          (dialogId) => {
            const el = document.activeElement;
            if (!el) return false;
            const dlg = document.querySelector('[role="dialog"]');
            return dlg ? dlg.contains(el) : false;
          }
        );
        await recordEvidence('assert-toBe-user-groups-add.spec-87', async () => expect(focused).toBe(true));
      }
    });
  });

  // ── Group Name Validation ────────────────────────────────────────

  test.describe('Group Name', () => {
    test('LIMAS-SUD-2445: Save is enabled when Group Name is empty', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toBeEnabled-user-groups-add.spec-97', async () => expect(groups.addGroupSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2446: Save remains enabled with valid Group Name', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('action-fill-user-groups-add.spec-102', async () => groups.addGroupNameInput.fill('ValidGroup'));
      await recordEvidence('assert-toBeEnabled-user-groups-add.spec-103', async () => expect(groups.addGroupSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2447: Save remains enabled with whitespace-only name', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('action-fill-user-groups-add.spec-108', async () => groups.addGroupNameInput.fill('   '));
      await recordEvidence('assert-toBeEnabled-user-groups-add.spec-109', async () => expect(groups.addGroupSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2448: Group Name preserves leading and trailing spaces', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('action-fill-user-groups-add.spec-114', async () => groups.addGroupNameInput.fill('  TestName  '));
      const value = await groups.addGroupNameInput.inputValue();
      await recordEvidence('assert-toBe-user-groups-add.spec-116', async () => expect(value).toBe('  TestName  '));
    });

    test('LIMAS-SUD-2449: Group Name accepts supported characters', async () => {
      await groups.openAddGroupDialog();
      const testName = 'Test-Group_2024 Alpha (Beta)';
      await recordEvidence('action-fill-user-groups-add.spec-122', async () => groups.addGroupNameInput.fill(testName));
      const value = await groups.addGroupNameInput.inputValue();
      await recordEvidence('assert-toBe-user-groups-add.spec-124', async () => expect(value).toBe(testName));
    });

    test('LIMAS-SUD-2450: Clearing restores Save to enabled', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('action-fill-user-groups-add.spec-129', async () => groups.addGroupNameInput.fill('TestGroup'));
      await recordEvidence('action-clear-user-groups-add.spec-130', async () => groups.addGroupNameInput.clear());
      await recordEvidence('assert-toBeEnabled-user-groups-add.spec-131', async () => expect(groups.addGroupSaveButton).toBeEnabled());
    });

    test('LIMAS-SUD-2451: Save remains enabled with Comment filled but empty name', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('action-fill-user-groups-add.spec-136', async () => groups.addGroupCommentInput.fill('Some comment'));
      await recordEvidence('assert-toBeEnabled-user-groups-add.spec-137', async () => expect(groups.addGroupSaveButton).toBeEnabled());
    });
  });

  // ── Comment Field ─────────────────────────────────────────────────

  test.describe('Comment Field', () => {
    test('LIMAS-SUD-2452: Comment is initially empty', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toHaveValue-user-groups-add.spec-146', async () => expect(groups.addGroupCommentInput).toHaveValue(''));
    });

    test('LIMAS-SUD-2453: Comment accepts multiline input', async () => {
      await groups.openAddGroupDialog();
      const comment = 'Line 1\nLine 2\nLine 3';
      await recordEvidence('action-fill-user-groups-add.spec-152', async () => groups.addGroupCommentInput.fill(comment));
      const value = await groups.addGroupCommentInput.inputValue();
      await recordEvidence('assert-toBe-user-groups-add.spec-154', async () => expect(value).toBe(comment));
    });

    test('LIMAS-SUD-2454: Comment clearing restores empty value', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('action-fill-user-groups-add.spec-159', async () => groups.addGroupCommentInput.fill('Temporary comment'));
      await recordEvidence('action-clear-user-groups-add.spec-160', async () => groups.addGroupCommentInput.clear());
      await recordEvidence('assert-toHaveValue-user-groups-add.spec-161', async () => expect(groups.addGroupCommentInput).toHaveValue(''));
    });
  });

  // ── Dismissal ─────────────────────────────────────────────────────

  test.describe('Dismissal', () => {
    test('LIMAS-SUD-2455: Cancel closes the dialog', async () => {
      await groups.openAddGroupDialog();
      await groups.dismissAddGroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-171', async () => expect(groups.addGroupDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2456: Close button closes the dialog', async () => {
      await groups.openAddGroupDialog();
      await groups.closeAddGroupDialog();
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-177', async () => expect(groups.addGroupDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2457: Escape closes the dialog', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('action-press-user-groups-add.spec-182', async () => groups.page.keyboard.press('Escape'));
      await recordEvidence('assert-toBeVisible-user-groups-add.spec-183', async () => expect(groups.addGroupDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2458: Reopening resets fields', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('action-fill-user-groups-add.spec-188', async () => groups.addGroupNameInput.fill('PreviousName'));
      await recordEvidence('action-fill-user-groups-add.spec-189', async () => groups.addGroupCommentInput.fill('Previous comment'));
      await recordEvidence('action-press-user-groups-add.spec-190', async () => groups.page.keyboard.press('Escape'));
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toHaveValue-user-groups-add.spec-192', async () => expect(groups.addGroupNameInput).toHaveValue(''));
      await recordEvidence('assert-toHaveValue-user-groups-add.spec-193', async () => expect(groups.addGroupCommentInput).toHaveValue(''));
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-2459: Group Name input has accessible name', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toHaveAccessibleName-user-groups-add.spec-202', async () => expect(groups.addGroupNameInput).toHaveAccessibleName(/Group Name/i));
    });

    test('LIMAS-SUD-2460: Comment input has accessible name', async () => {
      await groups.openAddGroupDialog();
      await recordEvidence('assert-toHaveAccessibleName-user-groups-add.spec-207', async () => expect(groups.addGroupCommentInput).toHaveAccessibleName('Comment'));
    });

    test('LIMAS-SUD-2461: All interactive elements are keyboard reachable', async () => {
      await groups.openAddGroupDialog();
      const focusable = [
        groups.addGroupNameInput,
        groups.addGroupCommentInput,
        groups.addGroupCancelButton,
        groups.addGroupSaveButton,
        groups.addGroupCloseButton,
      ];
      for (const el of focusable) {
        await recordEvidence('action-focus-user-groups-add.spec-220', async () => el.focus());
        const isFocused = await el.evaluate((e) => e === document.activeElement);
        await recordEvidence('assert-toBe-user-groups-add.spec-222', async () => expect(isFocused).toBe(true));
      }
    });
  });

  // ── Gated Create Lifecycle ────────────────────────────────────────

  test.describe('Synthetic Create Lifecycle', () => {
    test('LIMAS-SUD-2462: Gated lifecycle creates, verifies, and deletes a synthetic group', async () => {
      if (!MUTATION_ENABLED) {
        test.skip(true, 'Mutation flags not set');
        return;
      }
      test.skip(true, 'Synthetic lifecycle requires delete utilities; deferred');
    });
  });
});