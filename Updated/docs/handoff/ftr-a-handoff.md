# FTR-A Handoff: Features — Page Shell, Hierarchy, Search, Used in Profiles, Profile Navigation

## Scope

FTR-A covers the Features page shell, feature hierarchy (expand/collapse), search, feature row structure, the "Used in Profiles" dialog, and navigation from feature profiles to the Profiles page with safe return.

## Test Range

| Item | Value |
|------|-------|
| Test IDs | LIMAS-SUD-2029 – LIMAS-SUD-2059 |
| Count | 31 |
| Spec | `tests/features/features-profiles-navigation.spec.ts` |
| Page Object | `tests/pages/features.page.ts` |
| Plans | `plans/features/LIMAS-SUD-2029-*.md` through `LIMAS-SUD-2059-*.md` |
| Checklist | Rows appended to `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` |

## Describe Blocks

### 1. Page Shell (6 tests)
- LIMAS-SUD-2029: Sidebar navigation
- LIMAS-SUD-2030: h1 heading
- LIMAS-SUD-2031: Add Root Feature button
- LIMAS-SUD-2032: Expand/Collapse All buttons
- LIMAS-SUD-2033: Table column headers (6)
- LIMAS-SUD-2034: Table has loaded rows

### 2. Feature Hierarchy (4 tests)
- LIMAS-SUD-2035: Expand buttons on hierarchical rows
- LIMAS-SUD-2036: Expand All increases/maintains row count
- LIMAS-SUD-2037: Collapse All compacts rows
- LIMAS-SUD-2038: Repeated Expand All is idempotent

### 3. Search (6 tests)
- LIMAS-SUD-2039: Input accepts text
- LIMAS-SUD-2040: Filters by feature name
- LIMAS-SUD-2041: Matches on feature ID fragment
- LIMAS-SUD-2042: No-match shows zero rows
- LIMAS-SUD-2043: Clear restores rows
- LIMAS-SUD-2044: No duplicates after search+clear

### 4. Feature Row Structure (4 tests)
- LIMAS-SUD-2045: Feature name and ID
- LIMAS-SUD-2046: Add Child Feature, Edit, Delete buttons
- LIMAS-SUD-2047: Delete button disabled
- LIMAS-SUD-2048: Used in Profiles badge present and clickable

### 5. Used in Profiles Dialog (6 tests)
- LIMAS-SUD-2049: Badge click opens dialog
- LIMAS-SUD-2050: Dialog heading "Profiles Using This Feature"
- LIMAS-SUD-2051: Close button exists
- LIMAS-SUD-2052: Escape closes dialog
- LIMAS-SUD-2053: Profile cards displayed
- LIMAS-SUD-2054: Badge count consistent with dialog cards

### 6. Profile Navigation (4 tests)
- LIMAS-SUD-2055: Navigate to Profiles page
- LIMAS-SUD-2056: Correct profile opens
- LIMAS-SUD-2057: Return to Features preserves row count
- LIMAS-SUD-2058: No mutation requests during navigation

### 7. Safe Restoration (1 test)
- LIMAS-SUD-2059: Clean state after search/expand/clear cycle

## Live Inspection Findings

- **Route**: `/features`
- **APIs**: GET features, GET profiles (for dialog)
- **Table columns**: Feature Name (with ID), Versions, Access Levels, Used in Profiles (badge, cursor-pointer), Description, Actions
- **Used in Profiles badge**: `div.inline-flex` with `cursor-pointer`, click opens a dialog
- **Profiles Dialog**: Has heading, close button, profile cards, Escape dismisses
- **Hierarchy**: Some rows have expand chevron buttons, Expand All / Collapse All work
- **Actions**: Add Child Feature, Edit (enabled), Delete (disabled on all)
- **All read-only** for this batch — no mutations triggered

## End State

After FTR-A:
- FTR total: 31
- Grand total: 2079 (+31 from 2048)
- Last ID: LIMAS-SUD-2059