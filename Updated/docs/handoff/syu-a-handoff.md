# SYU-A: System Users — Search, Filters, Table, and Assignment Expansion — Handoff

## Summary
29 tests (LIMAS-SUD-2523 to LIMAS-SUD-2551) covering the System Users page shell, search, profiles filter, user groups filter, user groups overflow, profiles overflow, edit action, and accessibility.

## Key Findings (Live Inspection)

### Page Shell
- Heading h1: "System Users"
- Search input: `textbox "Search"` with placeholder "Search"
- Filter comboboxes for Profiles and User Groups
- Clear All button to reset all filters
- Count text showing filtered/total row counts
- Table with column headers, rows, scroll container
- No duplicate rows or missing values observed

### Search
- Client-side filtering by name and email
- Partial and case-insensitive matching
- Whitespace handling in search terms
- No-match state with clear behavior
- Count synchronisation with search results
- Combined search with profile filter

### Profiles Filter
- Listbox with profile options populated from available data
- Multi-select support with count synchronisation
- Duplicate prevention in selection

### User Groups Filter
- Tree structure with search within the filter
- Filter application and Clear All restoration
- Combined profile + group filtering

### User Groups Overflow
- Count display and expand/collapse for overflow rows
- Row isolation and collapse behavior
- Accessible name and expanded state

### Profiles Overflow
- Expand to reveal overflowed profiles
- Search assignment isolation

### Edit Action
- Accessible name and dialog open behavior
- Dialog buttons and close
- One edit action per row

### Accessibility
- Search input type semantics

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/system-users/system-users-search-filters.spec.ts` |
| POM | `tests/pages/system-users.page.ts` |
| Plans | `plans/syu-a/` (29 files: LIMAS-SUD-2523 to LIMAS-SUD-2551) |
| Handoff | `docs/handoff/syu-a-handoff.md` |
| Index | `docs/handoff/generated-test-index.md` (pending) |

## POM: SystemUsersPage

```typescript
// Page shell
heading, searchInput, profilesCombobox, userGroupsCombobox, clearAllButton

// Table
table, tableBody, rows, countText, columnHeaders, scrollContainer

// Row-level
rowEdit(row), rowProfilesOverflow(row), rowGroupsOverflow(row)
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `heading` | `page.getByRole('heading', { name: 'System Users', level: 1 })` |
| `searchInput` | `page.getByRole('textbox', { name: 'Search' })` |
| `profilesCombobox` | `page.getByRole('combobox', { name: /profile/i })` |
| `userGroupsCombobox` | `page.getByRole('combobox', { name: /user group/i })` |
| `clearAllButton` | `page.getByRole('button', { name: 'Clear All' })` |
| `rows` | `table tbody tr` |
| `countText` | Element showing filtered/total counts |
| `rowEdit` | `row.getByRole('button', { name: /edit/i })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Page Shell | 7 | 2523-2529 |
| Search | 7 | 2530-2536 |
| Profiles Filter | 3 | 2537-2539 |
| User Groups Filter | 3 | 2540-2542 |
| User Groups Overflow | 3 | 2543-2545 |
| Profiles Overflow | 2 | 2546-2547 |
| Edit Action | 3 | 2548-2550 |
| Accessibility | 1 | 2551 |

## Test Detail Table

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|-----------------|---------|--------|
| LIMAS-SUD-2523 | Page route and heading verification | plans/syu-a/LIMAS-SUD-2523.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2524 | Search input presence | plans/syu-a/LIMAS-SUD-2524.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2525 | Filter comboboxes presence | plans/syu-a/LIMAS-SUD-2525.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2526 | Clear All button | plans/syu-a/LIMAS-SUD-2526.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2527 | Count text element | plans/syu-a/LIMAS-SUD-2527.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2528 | Column headers and rows | plans/syu-a/LIMAS-SUD-2528.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2529 | Scroll, duplicates, missing values | plans/syu-a/LIMAS-SUD-2529.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2530 | Search by name | plans/syu-a/LIMAS-SUD-2530.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2531 | Search by email | plans/syu-a/LIMAS-SUD-2531.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2532 | Partial and case-insensitive search | plans/syu-a/LIMAS-SUD-2532.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2533 | Whitespace handling in search | plans/syu-a/LIMAS-SUD-2533.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2534 | No-match state and clear | plans/syu-a/LIMAS-SUD-2534.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2535 | Count sync with search results | plans/syu-a/LIMAS-SUD-2535.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2536 | Combined search with profile filter | plans/syu-a/LIMAS-SUD-2536.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2537 | Profiles listbox and options | plans/syu-a/LIMAS-SUD-2537.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2538 | Multi-select and count sync | plans/syu-a/LIMAS-SUD-2538.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2539 | Duplicate prevention in selection | plans/syu-a/LIMAS-SUD-2539.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2540 | User groups tree and search | plans/syu-a/LIMAS-SUD-2540.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2541 | Filter and Clear All restore | plans/syu-a/LIMAS-SUD-2541.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2542 | Combined profile and group filter | plans/syu-a/LIMAS-SUD-2542.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2543 | User groups overflow count and expand | plans/syu-a/LIMAS-SUD-2543.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2544 | User groups row isolation and collapse | plans/syu-a/LIMAS-SUD-2544.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2545 | User groups accessible name and expanded | plans/syu-a/LIMAS-SUD-2545.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2546 | Profiles overflow expand reveal | plans/syu-a/LIMAS-SUD-2546.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2547 | Profiles search assignment isolation | plans/syu-a/LIMAS-SUD-2547.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2548 | Edit accessible name and dialog open | plans/syu-a/LIMAS-SUD-2548.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2549 | Edit dialog buttons and close | plans/syu-a/LIMAS-SUD-2549.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2550 | One edit action per row | plans/syu-a/LIMAS-SUD-2550.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2551 | Search input type semantics | plans/syu-a/LIMAS-SUD-2551.md | tests/system-users/system-users-search-filters.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |

## Mutation Gates

None — this batch is fully read-only. No `TEST_PROFILE_*` or other mutation flags required.

## State After Testing
- Search empty
- Filters cleared
- No dialog open
- No request pending
- Browser visible and open