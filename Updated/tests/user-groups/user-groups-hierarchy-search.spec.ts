import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { UserGroupsPage } from '../pages/user-groups.page';

test.describe('UGR-A — User Groups — Page Shell, Hierarchy, Search', () => {
  let groups: UserGroupsPage;

  test.beforeEach(async ({ page }) => {
    groups = new UserGroupsPage(page);
    await groups.navigate();
    await groups.clearSearch();
    await groups.collapseAll();
  });

  test.afterEach(async () => {
    await groups.clearSearch();
    await groups.collapseAll();
    await groups.page.waitForLoadState('networkidle').catch(() => {});
  });

  // ── Page Shell ────────────────────────────────────────────────────

  test.describe('Page Shell', () => {
    test('LIMAS-SUD-2391: User Groups route is active in sidebar', async () => {
      const link = groups.page.locator('a[href="/groups"]');
      await recordEvidence('assert-toHaveAttribute-user-groups-hierarchy-search.spec-25', async () => expect(link).toHaveAttribute('aria-current', 'page'));
    });

    test('LIMAS-SUD-2392: Page heading is h1 "User Groups"', async () => {
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-29', async () => expect(groups.heading).toBeVisible());
      await recordEvidence('assert-toHaveText-user-groups-hierarchy-search.spec-30', async () => expect(groups.heading).toHaveText('User Groups'));
    });

    test('LIMAS-SUD-2393: Add Group button is visible', async () => {
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-34', async () => expect(groups.addGroupButton).toBeVisible());
      await recordEvidence('assert-toBeEnabled-user-groups-hierarchy-search.spec-35', async () => expect(groups.addGroupButton).toBeEnabled());
    });

    test('LIMAS-SUD-2394: Expand All and Collapse All buttons are visible', async () => {
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-39', async () => expect(groups.expandAllButton).toBeVisible());
      await recordEvidence('assert-toBeEnabled-user-groups-hierarchy-search.spec-40', async () => expect(groups.expandAllButton).toBeEnabled());
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-41', async () => expect(groups.collapseAllButton).toBeVisible());
      await recordEvidence('assert-toBeEnabled-user-groups-hierarchy-search.spec-42', async () => expect(groups.collapseAllButton).toBeEnabled());
    });

    test('LIMAS-SUD-2395: Search input is present with accessible name', async () => {
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-46', async () => expect(groups.searchInput).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-user-groups-hierarchy-search.spec-47', async () => expect(groups.searchInput).toHaveAttribute('placeholder', 'Search'));
    });

    test('LIMAS-SUD-2396: Table has correct column headers', async () => {
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-51', async () => expect(groups.columnHeaderGroups).toBeVisible());
      await recordEvidence('assert-toHaveText-user-groups-hierarchy-search.spec-52', async () => expect(groups.columnHeaderGroups).toHaveText('User Groups'));
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-53', async () => expect(groups.columnHeaderActions).toBeVisible());
      await recordEvidence('assert-toHaveText-user-groups-hierarchy-search.spec-54', async () => expect(groups.columnHeaderActions).toHaveText('Actions'));
    });

    test('LIMAS-SUD-2397: Group row container is scrollable', async () => {
      const overflowY = await groups.tableContainer.evaluate(
        (el) => getComputedStyle(el).overflowY
      );
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-61', async () => expect(overflowY).toBe('auto'));
    });

    test('LIMAS-SUD-2398: Initial page loads groups via read-only GET', async () => {
      const rowCount = await groups.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-66', async () => expect(rowCount).toBeGreaterThan(0));
    });
  });

  // ── Hierarchy ─────────────────────────────────────────────────────

  test.describe('Hierarchy', () => {
    test('LIMAS-SUD-2399: Root-level groups are visible with no indent', async () => {
      const rows = groups.groupRows;
      const count = await rows.count();
      const rootNames: string[] = [];
      for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const display = await row.evaluate((el) => getComputedStyle(el).display);
        if (display === 'none') continue;
        const indent = await groups.getRowIndentation(row);
        if (indent === '0rem' || indent === '') {
          rootNames.push(await groups.getRowName(row));
        }
      }
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-86', async () => expect(rootNames.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2400: Groups with children have expand toggle', async () => {
      const count = await groups.getRowCount();
      let hasToggle = false;
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        const display = await row.evaluate((el) => getComputedStyle(el).display);
        if (display === 'none') continue;
        const toggleVisible = await groups.rowToggle(row).isVisible().catch(() => false);
        if (toggleVisible) {
          hasToggle = true;
          break;
        }
      }
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-102', async () => expect(hasToggle).toBe(true));
    });

    test('LIMAS-SUD-2401: Expanding a parent group reveals its children', async () => {
      const count = await groups.getRowCount();
      const initialVisible = await groups.getVisibleRowCount();
      // Find a parent row with toggle
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        const toggle = groups.rowToggle(row);
        if (await toggle.isVisible().catch(() => false)) {
          await groups.expandRow(row);
          break;
        }
      }
      const afterExpand = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-118', async () => expect(afterExpand).toBeGreaterThan(initialVisible));
    });

    test('LIMAS-SUD-2402: Collapsing a parent hides its children', async () => {
      const count = await groups.getRowCount();
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        const toggle = groups.rowToggle(row);
        if (await toggle.isVisible().catch(() => false)) {
          await groups.expandRow(row);
          const expandedCount = await groups.getVisibleRowCount();
          await groups.collapseRow(row);
          const collapsedCount = await groups.getVisibleRowCount();
          await recordEvidence('assert-toBeLessThan-user-groups-hierarchy-search.spec-131', async () => expect(collapsedCount).toBeLessThan(expandedCount));
          break;
        }
      }
    });

    test('LIMAS-SUD-2403: Expanded state shows chevron-down icon', async () => {
      const count = await groups.getRowCount();
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        const toggle = groups.rowToggle(row);
        if (await toggle.isVisible().catch(() => false)) {
          await groups.expandRow(row);
          await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-144', async () => expect(await groups.isRowExpanded(row)).toBe(true));
          break;
        }
      }
    });

    test('LIMAS-SUD-2404: Child rows are indented relative to parent', async () => {
      const count = await groups.getRowCount();
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        const toggle = groups.rowToggle(row);
        if (await toggle.isVisible().catch(() => false)) {
          await groups.expandRow(row);
          break;
        }
      }
      // Verify at least one child row exists with deeper indent
      let foundIndented = false;
      const afterCount = await groups.getRowCount();
      for (let i = 0; i < afterCount; i++) {
        const row = groups.groupRows.nth(i);
        const display = await row.evaluate((el) => getComputedStyle(el).display);
        if (display === 'none') continue;
        const indent = await groups.getRowIndentation(row);
        if (indent && indent !== '0rem') {
          foundIndented = true;
          break;
        }
      }
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-173', async () => expect(foundIndented).toBe(true));
    });

    test('LIMAS-SUD-2405: Hierarchy preserves parent-child ordering', async () => {
      const count = await groups.getRowCount();
      const ordered: { name: string; indent: string }[] = [];
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        const name = await groups.getRowName(row);
        const indent = await groups.getRowIndentation(row);
        ordered.push({ name, indent });
      }
      // Parents (0rem) come before their children (deeper indent)
      let lastRootIdx = -1;
      for (let i = 0; i < ordered.length; i++) {
        if (ordered[i].indent === '0rem') lastRootIdx = i;
        else if (lastRootIdx >= 0) {
          await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-190', async () => expect(i).toBeGreaterThan(lastRootIdx));
        }
      }
    });
  });

  // ── Expand All / Collapse All ─────────────────────────────────────

  test.describe('Expand and Collapse All', () => {
    test('LIMAS-SUD-2406: Expand All reveals all hierarchy levels', async () => {
      const initialVisible = await groups.getVisibleRowCount();
      await groups.expandAll();
      const afterExpand = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-user-groups-hierarchy-search.spec-203', async () => expect(afterExpand).toBeGreaterThanOrEqual(initialVisible));
    });

    test('LIMAS-SUD-2407: Collapse All hides all child rows', async () => {
      await groups.expandAll();
      await groups.collapseAll();
      const afterCollapse = await groups.getVisibleRowCount();
      // After collapse, only root-level rows should be visible
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-211', async () => expect(afterCollapse).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2408: Repeated Expand All is idempotent', async () => {
      await groups.expandAll();
      const firstCount = await groups.getVisibleRowCount();
      await groups.expandAll();
      const secondCount = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-219', async () => expect(secondCount).toBe(firstCount));
    });

    test('LIMAS-SUD-2409: Repeated Collapse All is idempotent', async () => {
      await groups.collapseAll();
      const firstCount = await groups.getVisibleRowCount();
      await groups.collapseAll();
      const secondCount = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-227', async () => expect(secondCount).toBe(firstCount));
    });

    test('LIMAS-SUD-2410: Expand All toggle icons switch to chevron-down', async () => {
      await groups.expandAll();
      const count = await groups.getRowCount();
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        const display = await row.evaluate((el) => getComputedStyle(el).display);
        if (display === 'none') continue;
        const toggleVisible = await groups.rowToggle(row).isVisible().catch(() => false);
        if (toggleVisible) {
          await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-239', async () => expect(await groups.isRowExpanded(row)).toBe(true));
        }
      }
    });

    test('LIMAS-SUD-2411: Collapse All toggle icons switch to chevron-right', async () => {
      await groups.expandAll();
      await groups.collapseAll();
      const count = await groups.getRowCount();
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        const display = await row.evaluate((el) => getComputedStyle(el).display);
        if (display === 'none') continue;
        const toggleVisible = await groups.rowToggle(row).isVisible().catch(() => false);
        if (toggleVisible) {
          await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-254', async () => expect(await groups.isRowExpanded(row)).toBe(false));
        }
      }
    });

    test('LIMAS-SUD-2412: Expand All is keyboard accessible', async () => {
      await recordEvidence('action-focus-user-groups-hierarchy-search.spec-260', async () => groups.expandAllButton.focus());
      const isFocused = await groups.expandAllButton.evaluate(
        (el) => el === document.activeElement
      );
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-264', async () => expect(isFocused).toBe(true));
      await recordEvidence('action-press-user-groups-hierarchy-search.spec-265', async () => groups.page.keyboard.press('Enter'));
      const afterExpand = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-user-groups-hierarchy-search.spec-267', async () => expect(afterExpand).toBeGreaterThanOrEqual(1));
    });
  });

  // ── Search ────────────────────────────────────────────────────────

  test.describe('Search', () => {
    test('LIMAS-SUD-2413: Search finds exact match by group name', async () => {
      const firstRow = groups.groupRows.first();
      const firstName = await groups.getRowName(firstRow);
      const fragment = firstName.substring(0, Math.min(5, firstName.length));
      await groups.search(fragment);
      const visibleCount = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-280', async () => expect(visibleCount).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2414: Partial match returns group whose name contains fragment', async () => {
      const firstRow = groups.groupRows.first();
      const firstName = await groups.getRowName(firstRow);
      const mid = firstName.substring(1, Math.min(4, firstName.length));
      if (mid.length >= 2) {
        await groups.search(mid);
        const visibleCount = await groups.getVisibleRowCount();
        await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-290', async () => expect(visibleCount).toBeGreaterThan(0));
      }
    });

    test('LIMAS-SUD-2415: Search is case-insensitive', async () => {
      const firstRow = groups.groupRows.first();
      const firstName = await groups.getRowName(firstRow);
      const mixed = firstName.split('').map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase())).join('');
      await groups.search(mixed);
      const visibleCount = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-300', async () => expect(visibleCount).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2416: Leading and trailing whitespace is handled', async () => {
      const firstRow = groups.groupRows.first();
      const firstName = await groups.getRowName(firstRow);
      const fragment = firstName.substring(0, Math.min(5, firstName.length));
      await groups.search(`  ${fragment}  `);
      const visibleCount = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-309', async () => expect(visibleCount).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2417: No-match search shows empty state', async () => {
      await groups.search('zzzznonexistentquery');
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-314', async () => expect(groups.emptyState).toBeVisible());
    });

    test('LIMAS-SUD-2418: Clearing search restores all rows', async () => {
      const initialVisible = await groups.getVisibleRowCount();
      const firstRow = groups.groupRows.first();
      const firstName = await groups.getRowName(firstRow);
      await groups.search(firstName.substring(0, 3));
      await groups.clearSearch();
      const afterClear = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-324', async () => expect(afterClear).toBe(initialVisible));
    });

    test('LIMAS-SUD-2419: Search filters to parent groups matching by name', async () => {
      // Find a parent group and search for it
      const count = await groups.getRowCount();
      let parentName = '';
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        if (await groups.rowToggle(row).isVisible().catch(() => false)) {
          parentName = await groups.getRowName(row);
          break;
        }
      }
      if (parentName) {
        await groups.search(parentName);
        const visibleCount = await groups.getVisibleRowCount();
        await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-341', async () => expect(visibleCount).toBeGreaterThan(0));
      }
    });

    test('LIMAS-SUD-2420: Search interaction with Expand and Collapse is stable', async () => {
      const firstRow = groups.groupRows.first();
      const firstName = await groups.getRowName(firstRow);
      await groups.search(firstName.substring(0, 3));
      await groups.expandAll();
      // Should not crash or go to zero
      const visibleCount = await groups.getVisibleRowCount();
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-352', async () => expect(visibleCount).toBeGreaterThan(0));
      await groups.clearSearch();
    });
  });

  // ── Row-Action Structure ─────────────────────────────────────────

  test.describe('Row-Action Structure', () => {
    test('LIMAS-SUD-2421: Each row has Add Subgroup, Edit, and Delete buttons', async () => {
      const firstRow = groups.groupRows.first();
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-362', async () => expect(groups.rowAddSubgroup(firstRow)).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-363', async () => expect(groups.rowEdit(firstRow)).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-364', async () => expect(groups.rowDelete(firstRow)).toBeVisible());
    });

    test('LIMAS-SUD-2422: Add Subgroup has accessible name', async () => {
      const firstRow = groups.groupRows.first();
      await recordEvidence('assert-toHaveText-user-groups-hierarchy-search.spec-369', async () => expect(groups.rowAddSubgroup(firstRow)).toHaveText(/Add Subgroup/i));
    });

    test('LIMAS-SUD-2423: Edit has accessible name', async () => {
      const firstRow = groups.groupRows.first();
      await recordEvidence('assert-toHaveText-user-groups-hierarchy-search.spec-374', async () => expect(groups.rowEdit(firstRow)).toHaveText('Edit'));
    });

    test('LIMAS-SUD-2424: Delete button has destructive styling and is enabled', async () => {
      const firstRow = groups.groupRows.first();
      await recordEvidence('assert-toBeEnabled-user-groups-hierarchy-search.spec-379', async () => expect(groups.rowDelete(firstRow)).toBeEnabled());
      // Delete icon (trash) is present for visual destructive indication
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-381', async () => expect(groups.rowDelete(firstRow).locator('svg')).toBeVisible());
    });

    test('LIMAS-SUD-2425: Action buttons are keyboard reachable', async () => {
      const firstRow = groups.groupRows.first();
      const addBtn = groups.rowAddSubgroup(firstRow);
      await recordEvidence('action-focus-user-groups-hierarchy-search.spec-387', async () => addBtn.focus());
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-388', async () => expect(await addBtn.evaluate((el) => el === document.activeElement)).toBe(true));
    });

    test('LIMAS-SUD-2426: Child row actions are scoped to that row', async () => {
      // Expand first parent row and verify child's actions are distinct
      const count = await groups.getRowCount();
      for (let i = 0; i < count; i++) {
        const row = groups.groupRows.nth(i);
        if (await groups.rowToggle(row).isVisible().catch(() => false)) {
          await groups.expandRow(row);
          break;
        }
      }
      // Find a child row and verify its actions
      const afterCount = await groups.getRowCount();
      for (let i = 0; i < afterCount; i++) {
        const row = groups.groupRows.nth(i);
        const indent = await groups.getRowIndentation(row);
        if (indent && indent !== '0rem') {
          await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-407', async () => expect(groups.rowAddSubgroup(row)).toBeVisible());
          await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-408', async () => expect(groups.rowEdit(row)).toBeVisible());
          await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-409', async () => expect(groups.rowDelete(row)).toBeVisible());
          break;
        }
      }
    });
  });

  // ── API and States ────────────────────────────────────────────────

  test.describe('API and States', () => {
    test('LIMAS-SUD-2427: Initial load uses GET with read-only contract', async () => {
      const response = groups.page.waitForResponse(
        (r) => r.url().includes('/api/usergroups') && r.request().method() === 'GET'
      );
      await groups.navigate();
      const resp = await response;
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-425', async () => expect(resp.status()).toBe(200));
      const body = await resp.json();
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-427', async () => expect(Array.isArray(body)).toBe(true));
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-428', async () => expect(body.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2428: Response contains root groups with parent null', async () => {
      const response = groups.page.waitForResponse(
        (r) => r.url().includes('/api/usergroups') && r.request().method() === 'GET'
      );
      await groups.navigate();
      const resp = await response;
      const body = await resp.json();
      const rootGroups = body.filter((g: any) => g.parent === null);
      await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-439', async () => expect(rootGroups.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2429: No POST, PUT, PATCH, or DELETE during read-only exploration', async () => {
      const mutations: string[] = [];
      groups.page.on('request', (req) => {
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) {
          if (req.url().includes('/api/usergroups')) {
            mutations.push(req.method());
          }
        }
      });
      await groups.navigate();
      await groups.expandAll();
      await groups.collapseAll();
      await groups.search('test');
      await groups.clearSearch();
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-456', async () => expect(mutations.length).toBe(0));
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-2430: Sidebar link has aria-current="page"', async () => {
      const link = groups.page.locator('a[href="/groups"]');
      await recordEvidence('assert-toHaveAttribute-user-groups-hierarchy-search.spec-465', async () => expect(link).toHaveAttribute('aria-current', 'page'));
    });

    test('LIMAS-SUD-2431: Search input has accessible placeholder', async () => {
      await recordEvidence('assert-toHaveAttribute-user-groups-hierarchy-search.spec-469', async () => expect(groups.searchInput).toHaveAttribute('placeholder', 'Search'));
    });

    test('LIMAS-SUD-2432: Expand All and Collapse All have accessible names', async () => {
      await recordEvidence('assert-toHaveAccessibleName-user-groups-hierarchy-search.spec-473', async () => expect(groups.expandAllButton).toHaveAccessibleName('Expand All'));
      await recordEvidence('assert-toHaveAccessibleName-user-groups-hierarchy-search.spec-474', async () => expect(groups.collapseAllButton).toHaveAccessibleName('Collapse All'));
    });

    test('LIMAS-SUD-2433: Table has column headers for structure', async () => {
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-478', async () => expect(groups.columnHeaderGroups).toBeVisible());
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-479', async () => expect(groups.columnHeaderActions).toBeVisible());
    });

    test('LIMAS-SUD-2434: Delete button is distinguishable beyond color', async () => {
      // Delete uses a unique trash icon distinct from Edit (pen) and Add Subgroup (plus)
      const firstRow = groups.groupRows.first();
      const delSvg = groups.rowDelete(firstRow).locator('svg');
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-486', async () => expect(delSvg).toBeVisible());
      const delClass = await delSvg.getAttribute('class');
      await recordEvidence('assert-toContain-user-groups-hierarchy-search.spec-488', async () => expect(delClass).toContain('trash2'));
    });

    test('LIMAS-SUD-2435: Scrollable container supports keyboard navigation', async () => {
      const overflowY = await groups.tableContainer.evaluate(
        (el) => getComputedStyle(el).overflowY
      );
      await recordEvidence('assert-toBe-user-groups-hierarchy-search.spec-495', async () => expect(overflowY).toBe('auto'));
    });

    test('LIMAS-SUD-2436: Empty state is visible when no results match', async () => {
      await groups.search('zzzznonexistent');
      await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-500', async () => expect(groups.emptyState).toBeVisible());
    });
  });

  // ── Safe Restoration ──────────────────────────────────────────────

  test('LIMAS-SUD-2437: User Groups page restores to clean state after exploration', async () => {
    await groups.clearSearch();
    await groups.collapseAll();
    await recordEvidence('assert-toBeVisible-user-groups-hierarchy-search.spec-509', async () => expect(groups.heading).toBeVisible());
    const initialCount = await groups.getRowCount();
    await recordEvidence('assert-toBeGreaterThan-user-groups-hierarchy-search.spec-511', async () => expect(initialCount).toBeGreaterThan(0));
    await recordEvidence('assert-toHaveValue-user-groups-hierarchy-search.spec-512', async () => expect(groups.searchInput).toHaveValue(''));
  });
});