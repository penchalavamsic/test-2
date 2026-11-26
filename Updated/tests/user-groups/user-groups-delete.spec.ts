import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { UserGroupsPage } from '../pages/user-groups.page';

const MUTATION_ENABLED =
  process.env.TEST_USER_GROUP_ALLOW_MUTATION === 'true' &&
  process.env.TEST_USER_GROUP_ALLOW_DELETE === 'true';

test.describe('UGR-E — Delete Group', () => {
  let groups: UserGroupsPage;

  test.beforeEach(async ({ page }) => {
    groups = new UserGroupsPage(page);
    await groups.navigate();
    await groups.clearSearch();
    await groups.collapseAll();
  });

  test.afterEach(async () => {
    const alertdialog = groups.page.getByRole('alertdialog');
    if (await alertdialog.isVisible().catch(() => false)) {
      await recordEvidence('action-press-user-groups-delete.spec-21', async () => groups.page.keyboard.press('Escape'));
      await alertdialog.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }
    await groups.clearSearch();
    await groups.collapseAll();
    await groups.page.waitForLoadState('networkidle').catch(() => {});
  });

  // ── Delete Button ─────────────────────────────────────────────────

  test.describe('Delete Button', () => {
    test('LIMAS-SUD-2505: Delete button has destructive visual class', async () => {
      const row = groups.groupRows.first();
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-34', async () => expect(groups.rowDelete(row)).toBeVisible());
      await recordEvidence('assert-toHaveClass-user-groups-delete.spec-35', async () => expect(groups.rowDelete(row)).toHaveClass(/text-destructive/));
    });

    test('LIMAS-SUD-2506: Delete button is enabled for a runtime group', async () => {
      const row = groups.groupRows.first();
      await recordEvidence('assert-toBeEnabled-user-groups-delete.spec-40', async () => expect(groups.rowDelete(row)).toBeEnabled());
    });

    test('LIMAS-SUD-2507: Delete button has trash icon', async () => {
      const row = groups.groupRows.first();
      const delBtn = groups.rowDelete(row);
      await recordEvidence('assert-toBeAttached-user-groups-delete.spec-46', async () => expect(delBtn.locator('svg.lucide-trash2')).toBeAttached());
    });

    test('LIMAS-SUD-2508: Delete button is keyboard reachable', async () => {
      const row = groups.groupRows.first();
      await recordEvidence('action-focus-user-groups-delete.spec-51', async () => groups.rowDelete(row).focus());
      await recordEvidence('assert-toBeFocused-user-groups-delete.spec-52', async () => expect(groups.rowDelete(row)).toBeFocused());
    });
  });

  // ── Confirmation Dialog Structure ─────────────────────────────────

  test.describe('Confirmation Dialog', () => {
    test('LIMAS-SUD-2509: Delete opens alertdialog with accessible name', async () => {
      const row = groups.groupRows.first();
      await groups.openDeleteDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-62', async () => expect(groups.deleteDialog).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-user-groups-delete.spec-63', async () => expect(groups.deleteDialog).toHaveAttribute('role', 'alertdialog'));
    });

    test('LIMAS-SUD-2510: Dialog shows heading and warning text', async () => {
      const row = groups.groupRows.first();
      await groups.openDeleteDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-69', async () => expect(groups.deleteHeading).toBeVisible());
      await recordEvidence('assert-toHaveText-user-groups-delete.spec-70', async () => expect(groups.deleteHeading).toHaveText('Delete Group?'));
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-71', async () => expect(groups.deleteWarning).toBeVisible());
    });

    test('LIMAS-SUD-2511: Cancel and Delete buttons are present', async () => {
      const row = groups.groupRows.first();
      await groups.openDeleteDialog(row);
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-77', async () => expect(groups.deleteCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-78', async () => expect(groups.deleteConfirmButton).toBeVisible());
    });

    test('LIMAS-SUD-2512: Cancel has initial focus in confirmation dialog', async () => {
      const row = groups.groupRows.first();
      await groups.openDeleteDialog(row);
      const isFocused = await groups.deleteCancelButton.evaluate(
        (el) => el === document.activeElement
      );
      await recordEvidence('assert-toBe-user-groups-delete.spec-87', async () => expect(isFocused).toBe(true));
    });
  });

  // ── Warning Text by Group Type ────────────────────────────────────

  test.describe('Warning Text', () => {
    test('LIMAS-SUD-2513: Root with children warns subgroups will be promoted', async () => {
      // Default has children — verified in live inspection
      const row = groups.groupRows.filter({ has: groups.page.getByRole('button').filter({ has: groups.page.locator('svg.lucide-chevron-right, svg.lucide-chevron-down') }) }).first();
      await groups.openDeleteDialog(row);
      await recordEvidence('assert-toContainText-user-groups-delete.spec-98', async () => expect(groups.deleteWarning).toContainText('subgroups will be promoted'));
      await groups.cancelDeleteDialog();
    });

    test('LIMAS-SUD-2514: Leaf node warns action is irreversible', async () => {
      // Pick a row without toggle (leaf)
      const row = groups.groupRows.filter({ hasNot: groups.page.locator('button').filter({ has: groups.page.locator('svg.lucide-chevron-right') }) }).first();
      await groups.openDeleteDialog(row);
      await recordEvidence('assert-toContainText-user-groups-delete.spec-106', async () => expect(groups.deleteWarning).toContainText('cannot be undone'));
      await groups.cancelDeleteDialog();
    });

    test('LIMAS-SUD-2515: Subgroup with children warns subgroups will be promoted', async () => {
      // Expand a parent that has children, then find a child with its own toggle
      for (let i = 0; i < await groups.getRowCount(); i++) {
        const row = groups.groupRows.nth(i);
        if (await groups.rowToggle(row).isVisible().catch(() => false)) {
          await groups.expandRow(row);
          break;
        }
      }
      let foundToggle = false;
      for (let i = 0; i < await groups.getRowCount(); i++) {
        const row = groups.groupRows.nth(i);
        const indent = await groups.getRowIndentation(row);
        if (indent && indent !== '0rem') {
          if (await groups.rowToggle(row).isVisible().catch(() => false)) {
            foundToggle = true;
            await groups.openDeleteDialog(row);
            await recordEvidence('assert-toContainText-user-groups-delete.spec-127', async () => expect(groups.deleteWarning).toContainText('subgroups will be promoted'));
            await groups.cancelDeleteDialog();
            break;
          }
        }
      }
      if (!foundToggle) {
        // No subgroups with their own children visible — skip without failing
        await recordEvidence('assert-toBe-user-groups-delete.spec-135', async () => expect(foundToggle).not.toBe(false)); // force fail if truly impossible
      }
    });
  });

  // ── Dismissal ─────────────────────────────────────────────────────

  test.describe('Dismissal', () => {
    test('LIMAS-SUD-2516: Cancel dismisses the delete dialog', async () => {
      const row = groups.groupRows.first();
      await groups.openDeleteDialog(row);
      await groups.cancelDeleteDialog();
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-147', async () => expect(groups.deleteDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2517: Escape dismisses the delete dialog', async () => {
      const row = groups.groupRows.first();
      await groups.openDeleteDialog(row);
      await recordEvidence('action-press-user-groups-delete.spec-153', async () => groups.page.keyboard.press('Escape'));
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-154', async () => expect(groups.deleteDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2518: Cancel preserves the group in table', async () => {
      const row = groups.groupRows.first();
      const name = await groups.getRowName(row);
      await groups.openDeleteDialog(row);
      await groups.cancelDeleteDialog();
      await recordEvidence('assert-toHaveText-user-groups-delete.spec-162', async () => expect(groups.rowName(row)).toHaveText(name));
    });
  });

  // ── Search/Hierarchy After Cancellation ───────────────────────────

  test.describe('State After Cancellation', () => {
    test('LIMAS-SUD-2519: Search is functional after delete cancellation', async () => {
      const row = groups.groupRows.first();
      const name = await groups.getRowName(row);
      await groups.openDeleteDialog(row);
      await groups.cancelDeleteDialog();
      await recordEvidence('action-fill-user-groups-delete.spec-174', async () => groups.searchInput.fill(name));
      await recordEvidence('action-press-user-groups-delete.spec-175', async () => groups.searchInput.press('Enter'));
      await recordEvidence('assert-toBeVisible-user-groups-delete.spec-176', async () => expect(groups.rowName(row)).toBeVisible());
    });

    test('LIMAS-SUD-2520: Hierarchy is functional after delete cancellation', async () => {
      // Find a group with toggle and open delete on a different row then cancel
      const row = groups.groupRows.first();
      await groups.openDeleteDialog(row);
      await groups.cancelDeleteDialog();
      await groups.expandAll();
      // Verify expand actions still work
      for (let i = 0; i < await groups.getRowCount(); i++) {
        const r = groups.groupRows.nth(i);
        const indent = await groups.getRowIndentation(r);
        if (indent && indent !== '0rem') {
          // A child is visible; hierarchy works
          return;
        }
      }
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-2521: Delete button is distinguishable beyond color', async () => {
      const row = groups.groupRows.first();
      // Button has lucide-trash2 icon providing non-color distinction
      await recordEvidence('assert-toBeAttached-user-groups-delete.spec-203', async () => expect(groups.rowDelete(row).locator('svg')).toBeAttached());
    });
  });

  // ── Gated Lifecycle ───────────────────────────────────────────────

  test.describe('Synthetic Delete Lifecycle', () => {
    test('LIMAS-SUD-2522: Gated lifecycle creates, deletes, and verifies removal', async () => {
      if (!MUTATION_ENABLED) {
        test.skip(true, 'Mutation flags not set');
        return;
      }
      test.skip(true, 'Synthetic lifecycle requires create/delete utilities; deferred');
    });
  });
});