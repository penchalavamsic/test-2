# Reports Standard Licenses RSL-A Handoff

## Batch: RSL-A — Shell, Active Initial View, Table, Filters Shell, Initial Request

| Property | Value |
|---|---|
| Module | Reports |
| Sub-module | Standard Licenses |
| Batch | RSL-A |
| Access Profile | SUPER_USER_ADMIN_USER |
| Route | /reports |
| Date | 2026-11-12 |

## Live Inspection Summary

### A. Reports Navigation
- Sidebar link at index 3 (0-based) with `href="/reports"`, SVG icon, in an `<li>` within a `<ul>` (role=list)
- No `aria-label` on the link; identified by href and position
- Click navigates to `/reports` route

### B. Reports Page Shell
- Heading: `<h1>Reports</h1>` — only h1 on the page
- Description: "View, filter, and export licensing information."
- `<main>` region, `<footer>` with "© KPIT Technologies Ltd. All rights reserved."
- Header controls: language button, theme button, account button "as {email}"

### C. Report-Type Cards
- Three button-role cards with `aria-pressed`:
  - **Standard Licenses**: `aria-pressed="true"`, label "Standard Licenses", description "Standard and deleted license records"
  - **Floating Licenses**: `aria-pressed="false"`, label "Floating Licenses", description "Floating-license usage records"
  - **Floating Configurations**: `aria-pressed="false"`, label "Floating Configurations", description "Floating-license configuration records"
- All cards have SVG icons, `tabindex="0"`, enabled
- Cards do NOT have accessible names via `aria-label` (name comes from text content)

### D/E/F. Tabs
- Tab group: `role="group" aria-label="License mode"`
- **Active**: `aria-pressed="true"`, enabled, tabindex=0
- **Deleted**: `aria-pressed="false"`, enabled, tabindex=0
- Not activated in RSL-A

### G/H. Filters Panel
- **Filters button**: No `aria-expanded` attribute (accessibility gap). Text: "Filters", enabled, tabindex=0
- Nine filter controls:
  1. **Email**: `<input type="search" aria-label="Email">` — searchbox, empty
  2. **Hardware IDs**: `<input type="search" aria-label="Search Hardware IDs">` — searchbox, empty
  3. **Expiration Date**: `<input type="text" aria-label="Expiration Date">` + calendar button — empty
  4. **Maintenance Date**: Same pattern as Expiration Date — empty
  5. **User Group**: `<input type="search" aria-label="Search groups">` — searchbox, empty
  6. **Product Profile**: `<input type="search" aria-label="Search profiles">` — searchbox, empty
  7. **Profile Role**: `<input type="search" aria-label="Select a profile first" disabled>` — **disabled**, placeholder "Select a profile first"
  8. **License Created Date**: Date textbox + calendar — empty
  9. **License Modified Date**: Date textbox + calendar — empty
- **Clear button**: Text "Clear", enabled, visible. Clicking with empty controls does NOT trigger an API request.

### I. Clear Button
- No request on empty-state activation. Panel and table unchanged.

### J. Export Excel
- Button text "Export Excel", enabled, tabindex=0. Not activated in RSL-A.

### K/L. Table
- Semantic `<table>` with `<thead>` and `<tbody>`
- Six column headers (no `scope` attributes): User Group, Profile, Role, Email, Hardware ID, License Dates
- Each row: 6 cells — group, profile, role, email, hardwareId, "Exp: {date} Maint: {date}" format
- 10 rendered rows in the initial batch (runtime: {runtimeLoaded})

### M. Loaded-vs-Total
- Loaded text: "{runtimeLoaded} loaded · {runtimeTotal} total"
- Record-count toolbar: "{runtimeTotal} records"
- runtimeLoaded = 10 (initial batch size), runtimeTotal = 2699 (live example)
- Loaded ≤ total confirmed
- Rendered row count = loaded count

### N. Network
- **API**: `GET /limas/api/report/allstandardlicenses?page=0&size=10`
- **Response**: JSON, Spring Boot pagination
- Response shape: `{ content: [...], pageable: {...}, totalElements: {runtimeTotal}, totalPages: {runtimeTotalPages}, size: {runtimeBatchSize}, number: 0, first: true, last: false, numberOfElements: {runtimeLoaded}, empty: false }`
- Record fields: group, productProfile, profileRole, expirationDate, maintenanceDate, modifiedDate, createdDate, feature, featureVersion, deletedOn, email, hardwareId, contact
- Only 1 Standard License request on initial load
- No POST/PUT/PATCH/DELETE requests
- No duplicate initial requests

### O. Loading State
- Too transient to observe; page renders quickly with table data immediately

### P. Empty/Error Shell
- Not observable naturally — no empty or error state encountered

### Q. Infinite-Scroll
- Scroll container identified (table parent div)
- With only 10 rows loaded and 2699 total, more data is available
- RSL-A does not trigger additional loads

### R. Accessibility
- Heading hierarchy: single h1
- Cards use `aria-pressed` for selection state (not color-only)
- Tabs use `aria-pressed` for selection state
- Tab group has `aria-label="License mode"`
- Table headers lack `scope` attributes
- Filters button lacks `aria-expanded` attribute
- All main interactive elements have `tabindex="0"`
- Profile Role disabled state communicated via `disabled` attribute and placeholder text

## Test ID Range

| Range | Count | Status |
|---|---|---|
| LIMAS-SUD-1482 to LIMAS-SUD-1511 | 30 | Plan: Reviewed, Script: Generated, Execution: Not Run |

## Artifacts

| Artifact | Path |
|---|---|
| Page Object | `tests/pages/reports.page.ts` |
| Grouped Spec | `tests/reports/reports-standard-licenses-shell.spec.ts` |
| Plans | `plans/reports/LIMAS-SUD-1482-rsl-a-*.md` through `LIMAS-SUD-1511-rsl-a-*.md` |
| Handoff | `docs/handoff/rsl-a-handoff.md` |

## Test Groups in Spec

| Group | IDs | Count |
|---|---|---|
| Reports Navigation and Shell | 1482–1485 | 4 |
| Report-Type Cards | 1486–1488 | 3 |
| Active View Toolbar | 1489–1493 | 5 |
| Filters Panel Shell | 1494–1498 | 5 |
| Standard License Table | 1499–1503 | 5 |
| Initial Network and Counts | 1504–1507 | 4 |
| Accessibility | 1508–1511 | 4 |

## Scope Compliance

- ✅ No Deleted activation
- ✅ No Floating Licenses activation
- ✅ No Floating Configurations activation
- ✅ No filter-value entry
- ✅ No Export Excel activation
- ✅ No infinite-scroll trigger
- ✅ No data-changing requests
- ✅ Safe restoration in afterEach
- ✅ Dynamic placeholders only
- ✅ No hardcoded counts, emails, groups, profiles, roles, hardware IDs, dates, or URLs