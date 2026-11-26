## User & License Hub — Pagination, Page Size, Navigation, Boundaries (Batch ULH-D)

### Pagination Structure, Navigation, Page Size, Selection Sync, Boundaries, and Accessibility (ULH-D: SUD-1039 to SUD-1062, 24 tests)

**Verified ULH-D behaviors:**

- **Pagination Structure (5 tests):** Pagination summary visible — "Showing {start}–{end} of {total}" (LIMAS-SUD-1039), summary parsing to numeric {start, end, total} (LIMAS-SUD-1040), page summary visible — "Page {n} of {m}" (LIMAS-SUD-1041), page summary parsing to numeric {currentPage, totalPages} (LIMAS-SUD-1042), logical consistency — end-start+1 matches visible card count, end ≤ total (LIMAS-SUD-1043).

- **Pagination Navigation (5 tests):** Next button navigates forward one page (LIMAS-SUD-1044), Previous button navigates back one page (LIMAS-SUD-1045), Next sends `page={n+1}` in GET request, size and groupids preserved (LIMAS-SUD-1046), Previous sends `page={n-1}` in GET request, size and groupids preserved (LIMAS-SUD-1047), no stale cards remain after page transition — all cards from current page only (LIMAS-SUD-1048).

- **Page Size (5 tests):** Rows-per-page options are discoverable dynamically via combobox (LIMAS-SUD-1049), selecting alternative size sends GET with new `size` parameter (LIMAS-SUD-1050), page resets to page=0 (first page) on size change (LIMAS-SUD-1051), total pages recalculate — ceil(total/size) matches displayed (LIMAS-SUD-1052), visible card count matches selected page size when not on final page (LIMAS-SUD-1053).

- **Selection & License Sync (5 tests):** First user selected after Next navigation (LIMAS-SUD-1054), first user selected after Previous navigation (LIMAS-SUD-1055), license panel synchronizes to selected user after Next (LIMAS-SUD-1056), license panel synchronizes to selected user after Previous (LIMAS-SUD-1057), selected user always belongs to visible current page (LIMAS-SUD-1058).

- **Boundaries (3 tests):** First page — Previous disabled, Next enabled, range starts at 1 (LIMAS-SUD-1059), disabled Previous click triggers no API request and page state unchanged (LIMAS-SUD-1060), final-page boundary — source-supported, Next disabled, Previous enabled if pages > 1, range ends at total, card count = total % size (LIMAS-SUD-1061, deferred).

- **Accessibility (1 test):** Previous/Next accessible names, disabled state on buttons, combobox role and option semantics (LIMAS-SUD-1062).

**Key findings:**
- Page numbers are 0-based in API (page=0) but displayed 1-based in UI (Page 1). Next increments: page=0→1.
- Rows-per-page options observed: 10, 20, 25, 50, 100 (dynamically discovered, varies by context).
- Selecting a new page size resets page to 0 and recalculates total pages.
- Disabled Previous click triggers NO request — confirmed via network monitoring.
- Selection always moves to the first user on the navigated-to page; the license panel follows.
- Previous/Next are `<button>` elements with `disabled` attribute when inactive.
- No POST/PUT/PATCH/DELETE. All pagination is via GET to `/api/users/f`.
- Final page (92 of 92 with size 20) deferred: 91 clicks impractical. Source-supported expectations documented.

**Blocked cases: 1 (LIMAS-SUD-1061).** Script status: Not Started. Reaching page 92 requires excessive repeated navigation.

- **24 plans, 6 grouped spec files (LIMAS-SUD-1039 to LIMAS-SUD-1062); 1 deferred (1061), 23 deterministic; not executed**
- **Batch ULH-D status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1039 | Pagination summary visible — "Showing {start}–{end} of {total}" | plans/user-license-hub/LIMAS-SUD-1039-ulh-d-pagination-summary-visible.md | tests/user-license-hub/user-license-hub-pagination-structure.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1040 | Summary parsing to numeric {start, end, total} | plans/user-license-hub/LIMAS-SUD-1040-ulh-d-summary-parsing.md | tests/user-license-hub/user-license-hub-pagination-structure.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1041 | Page summary visible — "Page {n} of {m}" | plans/user-license-hub/LIMAS-SUD-1041-ulh-d-page-summary-visible.md | tests/user-license-hub/user-license-hub-pagination-structure.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1042 | Page summary parsing to numeric {currentPage, totalPages} | plans/user-license-hub/LIMAS-SUD-1042-ulh-d-page-summary-parsing.md | tests/user-license-hub/user-license-hub-pagination-structure.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1043 | Logical consistency — end-start+1 matches card count, end ≤ total | plans/user-license-hub/LIMAS-SUD-1043-ulh-d-pagination-logical-consistency.md | tests/user-license-hub/user-license-hub-pagination-structure.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1044 | Next button navigates forward one page | plans/user-license-hub/LIMAS-SUD-1044-ulh-d-next-navigates-forward.md | tests/user-license-hub/user-license-hub-pagination-navigation.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1045 | Previous button navigates back one page | plans/user-license-hub/LIMAS-SUD-1045-ulh-d-previous-navigates-back.md | tests/user-license-hub/user-license-hub-pagination-navigation.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1046 | Next sends page={n+1}, size and groupids preserved | plans/user-license-hub/LIMAS-SUD-1046-ulh-d-next-sends-page-param.md | tests/user-license-hub/user-license-hub-pagination-navigation.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1047 | Previous sends page={n-1}, size and groupids preserved | plans/user-license-hub/LIMAS-SUD-1047-ulh-d-previous-sends-page-param.md | tests/user-license-hub/user-license-hub-pagination-navigation.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1048 | No stale cards after page transition | plans/user-license-hub/LIMAS-SUD-1048-ulh-d-no-stale-cards-after-transition.md | tests/user-license-hub/user-license-hub-pagination-navigation.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1049 | Rows-per-page options discoverable dynamically | plans/user-license-hub/LIMAS-SUD-1049-ulh-d-rows-per-page-options-discoverable.md | tests/user-license-hub/user-license-hub-page-size.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1050 | Selecting alternative size sends GET with new size param | plans/user-license-hub/LIMAS-SUD-1050-ulh-d-size-sends-request.md | tests/user-license-hub/user-license-hub-page-size.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1051 | Page resets to page=0 on size change | plans/user-license-hub/LIMAS-SUD-1051-ulh-d-page-resets-on-size-change.md | tests/user-license-hub/user-license-hub-page-size.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1052 | Total pages recalculate — ceil(total/size) | plans/user-license-hub/LIMAS-SUD-1052-ulh-d-total-pages-recalculated.md | tests/user-license-hub/user-license-hub-page-size.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1053 | Visible card count matches selected page size | plans/user-license-hub/LIMAS-SUD-1053-ulh-d-card-count-matches-size.md | tests/user-license-hub/user-license-hub-page-size.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1054 | First user selected after Next navigation | plans/user-license-hub/LIMAS-SUD-1054-ulh-d-first-user-selected-after-next.md | tests/user-license-hub/user-license-hub-pagination-selection-sync.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1055 | First user selected after Previous navigation | plans/user-license-hub/LIMAS-SUD-1055-ulh-d-first-user-selected-after-previous.md | tests/user-license-hub/user-license-hub-pagination-selection-sync.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1056 | License panel synchronizes after Next | plans/user-license-hub/LIMAS-SUD-1056-ulh-d-license-panel-syncs-after-next.md | tests/user-license-hub/user-license-hub-pagination-selection-sync.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1057 | License panel synchronizes after Previous | plans/user-license-hub/LIMAS-SUD-1057-ulh-d-license-panel-syncs-after-previous.md | tests/user-license-hub/user-license-hub-pagination-selection-sync.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1058 | Selected user always belongs to visible current page | plans/user-license-hub/LIMAS-SUD-1058-ulh-d-selected-user-always-visible.md | tests/user-license-hub/user-license-hub-pagination-selection-sync.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1059 | First page boundary — Previous disabled, Next enabled | plans/user-license-hub/LIMAS-SUD-1059-ulh-d-first-page-boundary.md | tests/user-license-hub/user-license-hub-pagination-boundaries.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1060 | Disabled Previous click triggers no request | plans/user-license-hub/LIMAS-SUD-1060-ulh-d-disabled-previous-no-request.md | tests/user-license-hub/user-license-hub-pagination-boundaries.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1061 | Final-page boundary — Next disabled, range ends at total | plans/user-license-hub/LIMAS-SUD-1061-ulh-d-final-page-boundary.md | tests/user-license-hub/user-license-hub-pagination-boundaries.spec.ts | Source-supported | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1062 | Pagination controls accessible — roles, names, disabled states | plans/user-license-hub/LIMAS-SUD-1062-ulh-d-pagination-controls-accessible.md | tests/user-license-hub/user-license-hub-pagination-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |