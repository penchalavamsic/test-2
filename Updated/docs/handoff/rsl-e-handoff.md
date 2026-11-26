# Reports Standard Licenses RSL-E Handoff

## Batch: RSL-E — Active/Deleted Mode Switching

| Property | Value |
|---|---|
| Module | Reports |
| Sub-module | Standard Licenses |
| Batch | RSL-E |
| Access Profile | SUPER_USER_ADMIN_USER |
| Route | /reports |
| Date | 2026-11-12 |

## Live Inspection Summary

### A. Mode Control Structure
- Buttons inside `group "License mode"` → `button "Active"` and `button "Deleted"`
- `aria-pressed="true"/"false"` semantics (toggle buttons)
- Native `<button>` elements, no individual `aria-label`
- Keyboard-focusable, Enter/Space activates

### B. Already-selected Active click
- No duplicate network request when clicking already-selected Active button
- State remains unchanged: Active pressed, Deleted unpressed

### C. Active-to-Deleted Switch
- Click Deleted button → `aria-pressed="true"` on Deleted, `aria-pressed="false"` on Active
- Browser fires GET request to different API endpoint

### D. Deleted API Contract
- **Method**: GET
- **Endpoint**: `/api/report/allstandarddeleted`
- **Params**: `page` (0-based), `size` (500)
- **Initial call**: `GET /api/report/allstandarddeleted?page=0&size=500`
- **Response fields** (all standard fields + `deletedOn`): id, licenseId, hardwareId, email, contact, expirationDate, maintenanceDate, enabled, productProfileName, profileRoleName, createdDate, modifiedDate, deletedOn, groupName, featureName, featureVersion
- **Size=500** (much larger than Active's size=10)

### E. Deleted Counts
- **Toolbar**: "433 records" (total deleted records)
- **Loaded/Total**: "150 loaded · 433 total" (size=500 batch, actual ≤ 500)
- Toolbar count reflects Deleted total (433), not Active total (2,699)

### F. Deleted Table
- **6 columns**: User Group, Profile, Role, Email, Hardware ID, License Dates
- **License Dates cell**: `Exp: D M Y` + `Deleted: D M Y` (no Maintenance date shown)
- Each cell has two `<generic>` child elements
- `deletedOn` field in API response provides the deletion timestamp

### G. Deleted Infinite Scroll
- Same scroll mechanism as Active mode
- GET allstandarddeleted with incrementing page number
- Sentinel trigger and row append behavior identical to Active

### H. Filter Persistence
- **No cross-mode persistence**: switching modes loads a fresh state for the target mode
- Active with filters → switch to Deleted → Deleted loads unfiltered
- Deleted with filters → switch to Active → Active loads unfiltered (2,699 records)

### I. Core Filters in Deleted
- Filters button visible and functional in Deleted mode
- Same filter panel: Email, Hardware IDs, Groups, Product Profiles, Profile Roles
- Email filter: Enter triggers POST, chip appears at top
- Hardware IDs: Searchable combobox with checkboxes
- Profile Role disabled until Product Profile selected
- Filter chip format matches Active mode

### J. Date Filters in Deleted
- All 4 date inputs functional in Deleted mode
- Same IDs, type=date, change event trigger
- POST body includes date fields with ISO UTC timestamps
- Chips format matches Active mode: Exp, Maint, Created, Modified

### K. Clear in Deleted
- Global Clear button resets all filters in current Deleted mode
- Single POST with all fields null, page=0

### L. Deleted-to-Active Switch
- Click Active → `aria-pressed="true"` on Active, `aria-pressed="false"` on Deleted
- API: `GET /api/report/allstandardlicenses?page=0&size=10` + `page=1&size=10`
- Toolbar: "2,699 records", loaded/total: "20 loaded · 2,699 total"
- No filter state persists

### M. Stale Response Handling
- Active-to-Deleted during in-flight Active request: only Deleted data rendered
- Deleted-to-Active during in-flight Deleted request: only Active data rendered
- No race-condition rendering of stale data

### N. Loading Indicator
- Spinner/loading state visible during mode switch
- Disappears when data loads
- Present for both Active→Deleted and Deleted→Active

### O. Accessibility
- Mode buttons in Tab order (group "License mode")
- Enter and Space keys activate mode switch
- aria-pressed reflects current state
- group role provides semantic grouping

## File Index
| File | Status |
|---|---|
| tests/reports/reports-standard-licenses-mode-switching.spec.ts | New |
| tests/pages/reports.page.ts | Extended (mode-switching methods) |
| docs/handoff/rsl-e-handoff.md | This file |

## Key API Contracts
| Mode | Method | Endpoint | Page Param | Size Param |
|---|---|---|---|---|
| Active | GET | /api/report/allstandardlicenses | 0-based | 10 |
| Deleted | GET | /api/report/allstandarddeleted | 0-based | 500 |
| Filter (Active) | POST | /api/report/standardlicenses | 0 | 10 |
| Filter (Deleted) | POST | /api/report/standardlicenses | 0 | 10 |

## Notes
- Deleted mode uses size=500 (much larger batch), loading 150+ rows initially
- License Dates column shows Exp + Deleted instead of Exp + Maint
- deletedOn timestamp included in API response
- Mode switching always resets to page=0 for target mode
- No cross-mode filter persistence — each mode is independent
- Reliable stale-response handling prevents race conditions
- 26 test cases generated (LIMAS-SUD-1584 through LIMAS-SUD-1609)