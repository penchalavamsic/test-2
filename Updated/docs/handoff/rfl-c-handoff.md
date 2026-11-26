# RFL-C Handoff — Reports Floating Licenses Active and Deleted Views

## Batch

| Batch | Test ID Range | Count | Status |
|-------|--------------|-------|--------|
| RFL-C | LIMAS-SUD-1684 to LIMAS-SUD-1705 | 22 | Complete |

## Key Runtime Observations

### Deleted API Contract
- **Method:** GET
- **Path:** `/limas/api/report/allfloatingdeleted`
- **Query:** `page=0&size=500`
- **Status:** 200, `application/json`
- **Response:** Spring Page envelope
  - totalElements: {runtimeDeletedTotal} (13,806 in this environment)
  - numberOfElements: 500
  - totalPages: {runtimeDeletedPages} (28 in this environment)
  - size: 500
  - page: 0
  - first: true
  - last: false
  - empty: false

### Active API Contract
- **Method:** GET
- **Path:** `/limas/api/report/allfloatinglicenses`
- **Query:** `page=0&size=500`
- **Response:** Spring Page envelope, totalElements=0 in this environment

### Mode Controls
- Group: `role="group"`, `aria-label="Floating license mode"`
- Active button: `aria-pressed="true"/"false"`, no role, no tabindex
- Deleted button: `aria-pressed="false"/"true"`, no role, no tabindex
- Single-selection behavior: only one button pressed at a time
- Already-selected Active: clicking Active when already selected fires NO duplicate request
- Keyboard: reachable via Tab, activatable via Enter/Space

### Active-to-Deleted Switching
- Deleted becomes pressed, Active becomes unpressed
- Floating Licenses card remains selected
- Route remains `/reports`
- Distinct endpoint: `allfloatingdeleted` (not `allfloatinglicenses` with a mode param)
- Deleted pagination: page/size, 0-based, 500 per page

### Deleted View
- 13,806 records, infinite-scroll loaded to 200 in this session
- Table headers: Profile, Role, Email, Hardware ID, Details
- Details contains: Feature, Exp, Created, Deleted sub-fields
- Export Excel enabled (when records exist)
- Scroll container present with sentinel mechanism
- Infinite scroll uses same GET with incrementing page values

### Deleted-to-Active Switching
- Active becomes pressed, Deleted unpressed
- Active endpoint used: `/limas/api/report/allfloatinglicenses`
- Initial page/offset restored (page=0)
- Deleted rows removed
- Active counts returned: 0 records, 0 loaded · 0 total
- Scroll reset, sentinel reset
- No stale Deleted response overwrites Active

### Stale Response Safety
- Active → Deleted → Active sequence maintained final Active state
- Final counts belonged to Active (0/0)
- No mixed-mode data observed
- No duplicate mode requests observed

### Filter Persistence Across Modes
- To be determined at test execution time
- Suspected: filters either reset or persist depending on implementation
- Test captures actual contract dynamically

### Loading State
- Mode switching triggers brief loading indicator
- Previous-mode content may remain visible during transition
- Counts update after request settles
- Mode controls remain usable during loading
- Too transient to measure precisely without slow network simulation

### Accessibility
- Mode group accessible name: "Floating license mode"
- aria-pressed for active state communication
- Single-selection pattern communicated via button group
- Keyboard activation supported
- Focus indicators visible
- Non-color selected state via aria-pressed + visual styling
- Deleted results communicated via table content

## Test ID Mapping

| Test ID | Plan | Spec | Test Title | Evidence | Execution |
|---------|------|------|------------|----------|-----------|
| LIMAS-SUD-1684 | plans/reports/LIMAS-SUD-1684-rfl-c-mode-control-semantics.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Mode group role="group", aria-label="Floating license mode", Active aria-pressed, Deleted aria-pressed, keyboard reachability, single-selection, non-color selected state | Playwright MCP + network capture | Not Run |
| LIMAS-SUD-1685 | plans/reports/LIMAS-SUD-1685-rfl-c-already-selected-active.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Already-selected Active — click Active when already selected, verify no duplicate request, counts stable, scroll unchanged | Playwright MCP | Not Run |
| LIMAS-SUD-1686 | plans/reports/LIMAS-SUD-1686-rfl-c-active-to-deleted-switching.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Click Deleted → Deleted pressed, Active unpressed, FL card stays selected, scroll resets, route /reports | Playwright MCP | Not Run |
| LIMAS-SUD-1687 | plans/reports/LIMAS-SUD-1687-rfl-c-deleted-api-contract.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted API contract — GET /limas/api/report/allfloatingdeleted?page=0&size=500, Spring Page envelope, totalElements, numberOfElements, totalPages, compare with toolbar | Playwright MCP network capture | Not Run |
| LIMAS-SUD-1688 | plans/reports/LIMAS-SUD-1688-rfl-c-deleted-data-availability.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted data availability — totalElements > 0, rows rendered, Export enabled, filters available, counts match | Playwright MCP | Not Run |
| LIMAS-SUD-1689 | plans/reports/LIMAS-SUD-1689-rfl-c-deleted-counts.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted counts — toolbar count, loaded, total, rendered rows, loaded ≤ total, no Active contamination | Playwright MCP | Not Run |
| LIMAS-SUD-1690 | plans/reports/LIMAS-SUD-1690-rfl-c-deleted-table-structure.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted table — headers Profile/Role/Email/Hardware ID/Details, Details has Feature/Exp/Created/Deleted, row count, scroll container, text wrapping | Playwright MCP | Not Run |
| LIMAS-SUD-1691 | plans/reports/LIMAS-SUD-1691-rfl-c-deleted-export-state.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Export Excel enabled (when records present), no accidental activation | Playwright MCP | Not Run |
| LIMAS-SUD-1692 | plans/reports/LIMAS-SUD-1692-rfl-c-filter-persistence-across-modes.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Filter persistence — switch to Active, apply Product Profile, switch to Deleted, verify filter persists or resets, switch back to Active and verify | Playwright MCP | Not Run |
| LIMAS-SUD-1693 | plans/reports/LIMAS-SUD-1693-rfl-c-date-filter-persistence.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Date filter persistence — same with Expiration Date | Playwright MCP | Not Run |
| LIMAS-SUD-1694 | plans/reports/LIMAS-SUD-1694-rfl-c-deleted-non-date-filter.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted non-date filter — Product Profile, chip, client-side, counts sync, clear restores unfiltered | Playwright MCP | Not Run |
| LIMAS-SUD-1695 | plans/reports/LIMAS-SUD-1695-rfl-c-deleted-date-filter.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted date filter — Expiration Date, chip, client-side, clear restores | Playwright MCP | Not Run |
| LIMAS-SUD-1696 | plans/reports/LIMAS-SUD-1696-rfl-c-deleted-clear-filters.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted clear — with both filters populated, panel Clear / Clear all, all six clear, chips gone, Profile Role disabled, Deleted stays selected, counts restore | Playwright MCP | Not Run |
| LIMAS-SUD-1697 | plans/reports/LIMAS-SUD-1697-rfl-c-scroll-sentinel-reset.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Scroll and sentinel reset on mode switch — scroll=0, correct mode container, sentinel recalcs, loaded count only from active mode, no stale rows, at most 1 initial request | Playwright MCP | Not Run |
| LIMAS-SUD-1698 | plans/reports/LIMAS-SUD-1698-rfl-c-deleted-to-active-switching.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted-to-Active — clear filters, click Active, Active pressed, Deleted unpressed, Active contract used, page=0, Deleted rows removed, Active counts/state return, scroll resets, route /reports | Playwright MCP | Not Run |
| LIMAS-SUD-1699 | plans/reports/LIMAS-SUD-1699-rfl-c-stale-response-safety.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Stale response safety — Active→Deleted→Active sequence, verify final mode=Active, final counts Active, no mixed data, no duplicate requests | Playwright MCP | Not Run |
| LIMAS-SUD-1700 | plans/reports/LIMAS-SUD-1700-rfl-c-loading-state.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Loading state — observe loading indicator, toolbar visibility, previous-mode content, count update timing, indicator disappearance, aria-live/aria-busy, mode controls usable | Playwright MCP | Not Run |
| LIMAS-SUD-1701 | plans/reports/LIMAS-SUD-1701-rfl-c-mode-controls-a11y.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Mode controls a11y — group name, pressed announcements, single-selection, keyboard Enter/Space, visible focus, non-color selected, logical keyboard order | Playwright MCP | Not Run |
| LIMAS-SUD-1702 | plans/reports/LIMAS-SUD-1702-rfl-c-mode-change-a11y.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Mode-change a11y — change announcement, loading announcement, count announcement, Deleted results announcement, focus stability | Playwright MCP | Not Run |
| LIMAS-SUD-1703 | plans/reports/LIMAS-SUD-1703-rfl-c-deleted-table-a11y.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Deleted table a11y — header associations, row semantics, cell content, Details formatting, empty-state announcement | Playwright MCP | Not Run |
| LIMAS-SUD-1704 | plans/reports/LIMAS-SUD-1704-rfl-c-filter-state-a11y.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Filter state a11y — filter reset communication, chip communication, Profile Role disabled, Clear button communication | Playwright MCP | Not Run |
| LIMAS-SUD-1705 | plans/reports/LIMAS-SUD-1705-rfl-c-safe-restoration.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts | Safe restoration — FL selected, Active pressed, filters empty and collapsed, Profile Role disabled, Active counts 0/0, Export disabled, route /reports, browser open | Playwright MCP | Not Run |

## Page Object Changes

Added to `tests/pages/reports.page.ts`:

### New API Path
- `floatingLicensesDeletedApiPath = '/api/report/allfloatingdeleted'`

### New Methods (RFL-C section)
- `selectFloatingLicenseActiveMode()` — clicks Active if not pressed, waits for aria-pressed
- `selectFloatingLicenseDeletedMode()` — clicks Deleted if not pressed, waits for aria-pressed
- `getFloatingLicenseMode()` — returns `{ activePressed, deletedPressed }`
- `waitForFloatingLicenseModeRequest()` — waits for GET on either licenses or deleted endpoint
- `waitForFloatingLicenseDeletedRequest()` — waits for GET on deleted endpoint only
- `getFloatingLicenseModeCounts()` — returns `{ toolbarCount, loaded, total }`
- `getDeletedFloatingLicenseRows()` — returns FL table rows locator
- `verifyFloatingLicenseModeState()` — verifies FL card, Active, Deleted, and filter collapsed state
- `verifyNoMixedFloatingLicenseModeRows()` — verifies exclusive mode selection
- `restoreFloatingLicenseActiveMode()` — full Active mode restoration with filter cleanup

## End State
- Floating Licenses selected: Yes
- Active selected: Yes (0 records, 0 loaded · 0 total)
- Deleted unselected: Yes
- Filters collapsed: To be confirmed
- Profile Role disabled: To be confirmed
- Export disabled: Yes (0 records)
- Browser open: Yes
- Route: /reports