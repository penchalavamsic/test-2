## User & License Hub — Search, Filter Dialog, Group Filter, and Combinations (Batch ULH-C)

### User Search, Search States, Filter Dialog, Group Filter, Search-Filter Combinations, and Accessibility (ULH-C: SUD-1015 to SUD-1038, 24 tests)

**Verified ULH-C behaviors:**

- **User Search (4 tests):** Search is API-side — GET `/api/users/f` with `firstName` parameter (LIMAS-SUD-1015), typing triggers request on each input change (LIMAS-SUD-1016), search input retains entered value (LIMAS-SUD-1017), Enter key behavior (LIMAS-SUD-1018).
- **Search States (5 tests):** Name search sends value as `firstName` query param (LIMAS-SUD-1019), partial match returns matching users (LIMAS-SUD-1020), no-match shows "No users found" (LIMAS-SUD-1021), mixed case preserved in request (LIMAS-SUD-1022), clearing search restores full list (LIMAS-SUD-1023).
- **Filter Dialog (5 tests):** Dialog structure — role="dialog", h4 "Filter Users", User Group section (LIMAS-SUD-1024), aria-expanded toggle on Filters button (LIMAS-SUD-1025), Clear and Select buttons (LIMAS-SUD-1026), focus entry on open (LIMAS-SUD-1027), Escape/outside-click dismiss (LIMAS-SUD-1028).
- **Group Filter (5 tests):** Combobox + listbox "Suggestions" with option roles (LIMAS-SUD-1029), "All Groups" selected by default (LIMAS-SUD-1030), single-select — selecting one unselects previous (LIMAS-SUD-1031), selecting a group and clicking Select sends `groupids={id}` — page resets to 0 (LIMAS-SUD-1032), Filters badge shows active filter count (LIMAS-SUD-1033).
- **Search-Filter Combinations (3 tests):** Group then Search — both params in request (LIMAS-SUD-1034), Search then Group — both params persist (LIMAS-SUD-1035), clearing search with group active restores group-only scope (LIMAS-SUD-1036).
- **Accessibility (2 tests):** Search input lacks accessible name (LIMAS-SUD-1037), filter dialog component accessibility (LIMAS-SUD-1038).

**Key findings:**
- Search is API-side — NOT client-side. Each input change sends a GET to `/api/users/f` with the search term as `firstName` parameter.
- Name searching works via `firstName` parameter; partial prefixes match.
- Email searching also available — the same endpoint accepts `eMail` and `lastName` parameters.
- No-match state is "No users found" with no cards, no pagination, search value retained.
- Clearing restores the full default list with original pagination state.
- The filter dialog uses `role="dialog"` with a `combobox` + `listbox` "Suggestions" pattern for group selection.
- Group selection is single-select; "All Groups" is the default.
- Selecting a group and clicking Select sends a new GET with `groupids={singleGroupId}` — page resets to 0.
- Filters button shows badge count (e.g., "Filters 1") to indicate active filter count.
- Search and group filter combine: both `firstName` and `groupids` parameters present in request.
- No POST/PUT/PATCH/DELETE to any LIMAS API during any ULH-C activity.
- All requests are GET to `/api/users/f` with varying query parameters.

**Blocked cases: 0.** All 24 cases are deterministic and supported by live UI observation.

- **24 plans, 6 grouped spec files (LIMAS-SUD-1015 to LIMAS-SUD-1038); 0 blocked; not executed**
- **Batch ULH-C status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1015 | Search is API-side — GET /api/users/f with firstName param | plans/user-license-hub/LIMAS-SUD-1015-ulh-c-search-api-side.md | tests/user-license-hub/user-license-hub-user-search.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1016 | Typing triggers request on each input change | plans/user-license-hub/LIMAS-SUD-1016-ulh-c-search-immediate-trigger.md | tests/user-license-hub/user-license-hub-user-search.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1017 | Search input retains entered value | plans/user-license-hub/LIMAS-SUD-1017-ulh-c-search-retains-value.md | tests/user-license-hub/user-license-hub-user-search.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1018 | Enter key behavior on search | plans/user-license-hub/LIMAS-SUD-1018-ulh-c-search-enter-key.md | tests/user-license-hub/user-license-hub-user-search.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1019 | Name search sends firstName query param | plans/user-license-hub/LIMAS-SUD-1019-ulh-c-name-search-firstname-param.md | tests/user-license-hub/user-license-hub-user-search-states.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1020 | Partial match returns matching users | plans/user-license-hub/LIMAS-SUD-1020-ulh-c-search-partial-match.md | tests/user-license-hub/user-license-hub-user-search-states.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1021 | No-match shows "No users found" | plans/user-license-hub/LIMAS-SUD-1021-ulh-c-search-no-match-state.md | tests/user-license-hub/user-license-hub-user-search-states.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1022 | Mixed case preserved in request | plans/user-license-hub/LIMAS-SUD-1022-ulh-c-search-mixed-case.md | tests/user-license-hub/user-license-hub-user-search-states.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1023 | Clearing search restores full list | plans/user-license-hub/LIMAS-SUD-1023-ulh-c-search-clear-restores-list.md | tests/user-license-hub/user-license-hub-user-search-states.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1024 | Filter dialog structure — role="dialog", h4 "Filter Users" | plans/user-license-hub/LIMAS-SUD-1024-ulh-c-filter-dialog-structure.md | tests/user-license-hub/user-license-hub-user-filters-dialog.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1025 | Filters button aria-expanded toggle | plans/user-license-hub/LIMAS-SUD-1025-ulh-c-filters-button-aria-expanded.md | tests/user-license-hub/user-license-hub-user-filters-dialog.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1026 | Clear and Select buttons in dialog | plans/user-license-hub/LIMAS-SUD-1026-ulh-c-clear-select-buttons.md | tests/user-license-hub/user-license-hub-user-filters-dialog.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1027 | Focus entry on dialog open | plans/user-license-hub/LIMAS-SUD-1027-ulh-c-filter-dialog-focus-entry.md | tests/user-license-hub/user-license-hub-user-filters-dialog.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1028 | Escape/outside-click dismisses dialog | plans/user-license-hub/LIMAS-SUD-1028-ulh-c-filter-dialog-dismissal.md | tests/user-license-hub/user-license-hub-user-filters-dialog.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1029 | Combobox + listbox "Suggestions" with options | plans/user-license-hub/LIMAS-SUD-1029-ulh-c-group-combobox-listbox.md | tests/user-license-hub/user-license-hub-user-group-filter.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1030 | "All Groups" selected by default | plans/user-license-hub/LIMAS-SUD-1030-ulh-c-all-groups-default-selected.md | tests/user-license-hub/user-license-hub-user-group-filter.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1031 | Single-select — selecting one deselects previous | plans/user-license-hub/LIMAS-SUD-1031-ulh-c-group-single-select.md | tests/user-license-hub/user-license-hub-user-group-filter.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1032 | Selecting group sends GET with groupids param, page resets | plans/user-license-hub/LIMAS-SUD-1032-ulh-c-group-select-sends-request.md | tests/user-license-hub/user-license-hub-user-group-filter.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1033 | Filters badge shows active filter count | plans/user-license-hub/LIMAS-SUD-1033-ulh-c-filters-badge-count.md | tests/user-license-hub/user-license-hub-user-group-filter.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1034 | Group then Search — both params in request | plans/user-license-hub/LIMAS-SUD-1034-ulh-c-group-then-search-combination.md | tests/user-license-hub/user-license-hub-search-filter-combination.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1035 | Search then Group — both params persist | plans/user-license-hub/LIMAS-SUD-1035-ulh-c-search-then-group-combination.md | tests/user-license-hub/user-license-hub-search-filter-combination.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1036 | Clear search with group active restores group scope | plans/user-license-hub/LIMAS-SUD-1036-ulh-c-clear-search-group-active.md | tests/user-license-hub/user-license-hub-search-filter-combination.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1037 | Search input lacks accessible name | plans/user-license-hub/LIMAS-SUD-1037-ulh-c-search-no-accessible-name.md | tests/user-license-hub/user-license-hub-search-filter-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1038 | Filter dialog component accessibility | plans/user-license-hub/LIMAS-SUD-1038-ulh-c-filter-dialog-a11y.md | tests/user-license-hub/user-license-hub-search-filter-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |