# Reports Standard Licenses RSL-D Handoff

## Batch: RSL-D — Date Filters

| Property | Value |
|---|---|
| Module | Reports |
| Sub-module | Standard Licenses |
| Batch | RSL-D |
| Access Profile | SUPER_USER_ADMIN_USER |
| Route | /reports |
| Date | 2026-11-12 |

## Live Inspection Summary

### A. Date-Control Structure
- All 4 date controls are native HTML `type="date"` inputs
- **IDs**: `report-exp-date`, `report-maint-date`, `report-created-date`, `report-modified-date`
- **Label**: Parent text element (no `<label for>` association, no `aria-label`)
- **State**: Enabled, empty initially, no `min`/`max`/`step`/`required`/`readOnly`/`role`
- **Calendar trigger**: Button "Open calendar" adjacent to each input
- **Display format**: `YYYY-MM-DD` (ISO date, no time component in input display)

### B. Native Date-Picker
- **Type**: Browser-native chrome (`type="date"` input), NOT application DOM
- **Not inspectable** via Playwright accessibility tree (browser chrome is not DOM-accessible)
- **Behavior**: Click/calendar button opens native picker, selection fires `change` event immediately
- **Documented limitation**: Browser native picker is not inspectable

### C. Expiration Date Key Findings
- **Field**: `expirationDate` in POST body
- **Format**: ISO timestamp string in UTC (e.g. `"2026-10-14T18:30:00.000Z"`)
- **Trigger**: `change` event fires on fill/picker selection (NOT Enter key)
- **Chip**: `Exp: YYYY-MM-DD` with Remove button
- **Filtered counts**: Updated immediately after POST response
- **Toolbar base total**: Always shows 2,699 records (unfiltered base)
- **Loaded/total row**: Shows filtered counts (e.g. "10 loaded · 2,350 total")

### D. Maintenance Date
- **Field**: `maintenanceDate` in POST body
- **Chip**: `Maint: YYYY-MM-DD`
- Full contract matches Expiration Date pattern

### E. License Created Date
- **Field**: `createdDate` in POST body
- **Chip**: `Created: YYYY-MM-DD`

### F. License Modified Date
- **Field**: `modifiedDate` in POST body
- **Chip**: `Modified: YYYY-MM-DD`

### G. Combined Date Behavior
- Each date change fires an individual POST
- POST body includes ALL currently populated date fields (not just the changed one)
- Example: Filling Expiration after Maintenance → POST has both `expirationDate` and `maintenanceDate`

### H. Clear Behavior (Global Clear with Dates)
- **Confirmed**: Global Clear resets ALL date fields to empty
- This corrects the earlier RSL-C observation that Clear left date fields untouched — that was accurate for the RSL-C specific inspection where only core filters were tested. Global Clear does reset dates.
- Single POST fires with all dates as `null`
- Unfiltered data returns

### I. Core Filter + Date
- Email + Expiration Date combined: POST body includes both `email` (string) and `expirationDate` (ISO timestamp)
- Both chips visible simultaneously
- Clear restores all filters

### J. No-Result State
- No-match date yields `loaded=0`, `total=0`
- Toolbar base total remains 2,699
- Table headers remain visible
- Clear restores unfiltered data

## Test ID Range

| Range | Count | Status |
|---|---|---|
| LIMAS-SUD-1557 to LIMAS-SUD-1583 | 27 | Plan: Reviewed, Script: Generated, Execution: Not Run |

## Artifacts

| Artifact | Path |
|---|---|
| Page Object | `tests/pages/reports.page.ts` |
| Grouped Spec | `tests/reports/reports-standard-licenses-date-filters.spec.ts` |
| Plans | `plans/reports/LIMAS-SUD-1557-rsl-d-*.md` through `LIMAS-SUD-1583-rsl-d-*.md` |
| Handoff | `docs/handoff/rsl-d-handoff.md` |
| Excel Append | `scripts/append_rsl_d_xlsx.py` |

## Test Groups in Spec

| Group | IDs | Count |
|---|---|---|
| Date Control Structure | 1557 | 1 |
| Expiration Date | 1558, 1559, 1560, 1561, 1562, 1563, 1564, 1565, 1566 | 9 |
| Other Date Filters | 1567, 1568, 1569, 1570, 1571, 1572 | 6 |
| Clear and Combined Dates | 1573, 1574, 1575, 1576, 1577 | 5 |
| Core Filter and Date | 1578 | 1 |
| Counts and Infinite-Scroll Reset | 1579, 1580, 1581 | 3 |
| Accessibility and Restoration | 1582, 1583 | 2 |

## Scope Compliance

- ✅ No Deleted activation
- ✅ No Floating Licenses/Configurations activation
- ✅ No Export Excel activation
- ✅ No data-changing requests
- ✅ No full date-pair combination matrix (one representative Expiration+Maintenance only)
- ✅ No deliberate filtered infinite scrolling
- ✅ Dynamic dates from `getReportDateRuntimeData()` (no hardcoded dates)
- ✅ No hardcoded counts, page numbers, emails, hardware IDs
- ✅ No waitForTimeout (>500ms only in same-date reapply check)
- ✅ No XPath, no coordinate clicks
- ✅ No DOM mutation
- ✅ Browser remains open

## Final Report

| Metric | Value |
|---|---|
| Date input type | `type="date"` (native) |
| Date control IDs | report-exp-date, report-maint-date, report-created-date, report-modified-date |
| Trigger mechanism | `change` event (on fill/picker selection) |
| API endpoint | POST /api/report/standardlicenses |
| Date field format | ISO timestamp UTC (e.g. 2026-10-14T18:30:00.000Z) |
| Empty date representation | `null` in JSON body |
| Chip format | `{Prefix}: YYYY-MM-DD` with Remove button |
| Global Clear behavior | Resets all date fields AND core filters |
| Toolbar base total | Always 2,699 (never changes) |
| Filtered counts | Shown in loaded/total row |
| Individual clear | Backspace-to-empty triggers POST with date=null |
| Combined dates | POST includes all populated date fields |
| Tests executed | No |
| Reports generated | No |
| Healer invoked | No |
| Browser remains open | Yes |
| RSL-D status | COMPLETE |