# UGR-A: User Groups — Page Shell, Hierarchy, Search — Handoff

## Summary
47 tests (LIMAS-SUD-2391 to LIMAS-SUD-2437) covering the User Groups page shell, hierarchical group list, search, Expand All / Collapse All, row-action structure, API contract, accessibility, and safe restoration.

## Key Findings (Live Inspection)

### Page Shell
- Heading h1: "User Groups"
- Sidebar link `a[href="/groups"]` with `aria-current="page"`
- Add Group button: `button "Add Group"` (visible, enabled)
- Expand All: `button "Expand All"`; Collapse All: `button "Collapse All"`
- Search: `textbox "Search"` with placeholder "Search"
- Table columns: "User Groups" and "Actions"

### Hierarchy
- Table-based rendering: `<table>` > `<thead>` + `<tbody>` > `<tr>` rows
- Groups with children have a toggle `button` in the first cell, no `aria-expanded`
- Collapsed: SVG `lucide-chevron-right`, Expanded: SVG `lucide-chevron-down`
- Indentation: `style="padding-left: Nrem"` on inner `.flex.items-center` div
  - Root: `0rem`, Child: `2rem`, Grandchild: `4rem`, Great-grandchild: `6rem`
- Max depth observed: 4 levels (0rem → 2rem → 4rem → 6rem)
- Children appear as new rows immediately after parent (not hidden/shown via CSS)

### Scroll
- Table container `overflow-y: auto`, `max-height: 258px` on inspected viewport
- Main region `overflow: auto`

### Search
- Client-side filtering: non-matching rows get `display: none`
- Empty state: "No data available" text in the table body
- Case-insensitive, partial matching

### Row Actions
- Three buttons per row: `button "Add Subgroup"` (lucide-plus), `button "Edit"` (lucide-square-pen), `button` no text (lucide-trash2 = Delete)
- All enabled, no aria-labels on action buttons
- Delete has no text — identified by `svg.lucide-trash2`

### API
- `GET http://localhost:8083/limas/api/usergroups` returns JSON array
- Root groups: `parent: null`; children: `parent: <@id>` reference
- Nested `children[]` arrays in response
- No mutations during read-only exploration

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/user-groups/user-groups-hierarchy-search.spec.ts` |
| POM | `tests/pages/user-groups.page.ts` |
| Plans | `plans/ugr-a/` (47 files: LIMAS-SUD-2391 to LIMAS-SUD-2437) |
| Handoff | `docs/handoff/ugr-a-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (pending) |
| Index | `docs/handoff/generated-test-index.md` (pending) |

## POM: UserGroupsPage

```typescript
// Page shell
heading, addGroupButton

// Controls
expandAllButton, collapseAllButton, searchInput

// Table
table, tableBody, groupRows, columnHeaderGroups, columnHeaderActions, tableContainer

// Row-level (row-scoped <tr>)
rowToggle(row), rowName(row), rowAddSubgroup(row), rowEdit(row), rowDelete(row),
rowIndentation(row), rowByName(name)

// States
emptyState
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `heading` | `page.getByRole('heading', { name: 'User Groups', level: 1 })` |
| `addGroupButton` | `page.getByRole('button', { name: 'Add Group' })` |
| `expandAllButton` | `page.getByRole('button', { name: 'Expand All' })` |
| `collapseAllButton` | `page.getByRole('button', { name: 'Collapse All' })` |
| `searchInput` | `page.getByRole('textbox', { name: 'Search' })` |
| `groupRows` | `table tbody tr` |
| `rowToggle` | `row.locator('td').first().locator('button').first()` |
| `rowName` | `row.locator('td').first().locator('p')` |
| `rowAddSubgroup` | `row.getByRole('button', { name: 'Add Subgroup' })` |
| `rowEdit` | `row.getByRole('button', { name: 'Edit' })` |
| `rowDelete` | `row.locator('button:has(svg.lucide-trash2)')` |
| `rowIndentation` | `row.locator('td').first().locator('.flex.items-center')` |
| `rowByName` | `groupRows.filter({ has: td p with text })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Page Shell | 8 | 2391-2398 |
| Hierarchy | 7 | 2399-2405 |
| Expand / Collapse All | 7 | 2406-2412 |
| Search | 8 | 2413-2420 |
| Row-Action Structure | 6 | 2421-2426 |
| API and States | 3 | 2427-2429 |
| Accessibility | 7 | 2430-2436 |
| Safe Restoration | 1 | 2437 |

## Mutation Gates

None — this batch is fully read-only. No `TEST_PROFILE_*` or other mutation flags required.

## State After Testing
- Search empty
- Collapse All applied
- No dialog open
- No request pending
- Browser visible and open