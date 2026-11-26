# Reports Standard Licenses RSL-C Handoff

## Batch: RSL-C — Core Filters

| Property | Value |
|---|---|
| Module | Reports |
| Sub-module | Standard Licenses |
| Batch | RSL-C |
| Access Profile | SUPER_USER_ADMIN_USER |
| Route | /reports |
| Date | 2026-11-12 |

## Live Inspection Summary

### A. Filter Panel
- **Controls**: 9 total — Email, Hardware IDs, Expiration Date, Maintenance Date, User Group, Product Profile, Profile Role, License Created Date, License Modified Date
- **RSL-C scope**: Email, Hardware IDs, User Group, Product Profile, Profile Role (5 controls)
- **Profile Role**: Disabled initially (`Select a profile first` placeholder). Enabled only when Product Profile is selected.
- **Date controls**: Untouched (outside RSL-C scope)
- **Expand behavior**: No API request triggered by collapsible panel expansion alone

### B. Email Filter
- **Control type**: `<searchbox "Email">` — text input
- **Trigger**: Enter key (typing alone does NOT trigger)
- **Filter chip**: Displays `Email: {value}` with individual `Remove` button and `Clear all` button
- **Filters panel**: Remains expanded with values visible after filter

### C. Hardware IDs Filter
- **Control type**: Searchable combobox with checkboxes
- **Selection**: Type to search, click checkbox to select
- **Filter chip**: Displays `HW IDs: {count}` with Remove button
- **Multi-value**: Supports selecting multiple hardware IDs
- **Important**: Total count (`2,699 records` at top) does NOT update to reflect filter — always shows base total. The loaded/total row shows filtered counts.

### D. User Group Filter
- **Control type**: `<searchbox "Search groups">` — searchable combobox
- **Options**: Read dynamically from API (`/api/account-scope/usergroups?view=summary`)
- **Selection behavior**: Select from dropdown options

### E. Product Profile + Profile Role Filters
- **Product Profile**: `<searchbox "Search profiles">` — searchable combobox; options from `/api/account-scope/profiles?view=summary`
- **Profile Role**: `<searchbox>`, disabled until Product Profile is selected
- **Dependency**: Selecting Product Profile enables Profile Role; clearing Profile disables and clears Profile Role
- **Profile change**: Changing Product Profile clears incompatible Profile Role; options refresh

### F. Filter API Contract
- **Endpoint**: `POST /api/report/standardlicenses?page=0&size=10`
- **Content-Type**: `application/json`
- **Request body fields** (all present in every POST):
  - `group: string[]` — User Group filter
  - `productProfile: string[]` — Product Profile filter
  - `profileRole: string[]` — Profile Role filter
  - `feature: string[]` — not used by RSL-C
  - `featureVersion: string[]` — not used by RSL-C
  - `systemUser: string | null`
  - `email: string | null`
  - `hardwareId: string[]`
  - `expirationDate: string | null`
  - `maintenanceDate: string | null`
  - `createdDate: string | null`
  - `modifiedDate: string | null`
  - `@id: string` — unique request identifier
- **Response**: Standard Spring Data paginated JSON with `content`, `totalElements`, `totalPages`, `pageable`, `last`, `numberOfElements`
- **GET vs POST**: Infinite scroll data loading uses `GET /api/report/allstandardlicenses`. Filter queries use `POST /api/report/standardlicenses`.

### G. Clear Behavior
- **Clear button**: Resets all filter values to null/empty, removes chips, restores unfiltered data
- **Multiple fields**: Single POST to reset, no duplicate requests
- **Profile Role**: Disabled after Clear
- **Date controls**: Not reset by Clear (outside RSL-C scope)

### H. Filter Reset and Infinite Scroll
- **page=0**: Every filter application resets to page=0
- **Stale rows**: Existing appended rows removed on filter
- **Scroll position**: Resets appropriately (scrollTop=0 is acceptable after filter)
- **No stale pages**: No infinite scroll requests after filter

## Test ID Range

| Range | Count | Status |
|---|---|---|
| LIMAS-SUD-1530 to LIMAS-SUD-1556 | 27 | Plan: Reviewed, Script: Generated, Execution: Not Run |

## Artifacts

| Artifact | Path |
|---|---|
| Page Object | `tests/pages/reports.page.ts` |
| Grouped Spec | `tests/reports/reports-standard-licenses-core-filters.spec.ts` |
| Plans | `plans/reports/LIMAS-SUD-1530-rsl-c-*.md` through `LIMAS-SUD-1556-rsl-c-*.md` |
| Handoff | `docs/handoff/rsl-c-handoff.md` |
| Excel Append | `scripts/append_rsl_c_xlsx.py` |

## Test Groups in Spec

| Group | IDs | Count |
|---|---|---|
| Filter Panel | 1530 | 1 |
| Email Filter | 1531, 1532, 1533, 1534, 1535, 1536, 1537 | 7 |
| Hardware IDs Filter | 1538, 1539, 1540, 1541, 1542 | 5 |
| User Group, Product Profile, Profile Role | 1543, 1544, 1545, 1546, 1547, 1548, 1549, 1550, 1551 | 9 |
| Clear Button and Combined | 1552, 1553, 1554, 1555, 1556 | 5 |

## Scope Compliance

- ✅ No Deleted activation
- ✅ No Floating Licenses activation
- ✅ No Floating Configurations activation
- ✅ No Export Excel activation
- ✅ Only POST filter endpoint used (no data mutations)
- ✅ No full-dataset traversal
- ✅ No data-changing requests
- ✅ Dynamic placeholders only (no hardcoded emails, HW IDs, counts)
- ✅ No waitForTimeout (uses waitFor/waitForResponse)
- ✅ No XPath
- ✅ No fixed sleeps (>500ms)
- ✅ Browser remains open

## Final Report

| Metric | Value |
|---|---|
| Filter API endpoint | POST /api/report/standardlicenses |
| Infinite scroll API endpoint | GET /api/report/allstandardlicenses |
| Email trigger | Enter key |
| Hardware IDs control | Searchable combobox + checkboxes |
| User Group control | Searchable combobox |
| Product Profile control | Searchable combobox |
| Profile Role dependency | Enabled only after Profile selection |
| Filter chip format | `{Field}: {value}` with Remove button |
| Clear all button | Present when any filter active |
| page reset on filter | Always page=0 |
| Total count behavior | Base total (2,699) shown at top; filtered total in loaded row |
| Tests executed | No |
| Reports generated | No |
| Healer invoked | No |
| Browser remains open | Yes |
| RSL-C status | COMPLETE |