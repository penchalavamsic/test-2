# ULH-H Handoff — License Search & Filters

**Batch:** ULH-H  
**Test IDs:** LIMAS-SUD-1122 through LIMAS-SUD-1162 (41 test cases)  
**Spec:** `tests/user-license-hub/user-license-hub-license-search-filters.spec.ts`  
**Page Object:** `tests/pages/user-license-hub.page.ts` (extended)  

---

## Live Inspection Findings Summary

### Hardware ID Search
- **API-side filtering** via `hardwareIds` query parameter on `GET /api/users/f`
- Sends on each keystroke (fill triggers immediate request)
- License panel reflects filtered user licenses
- Filters badge increments when search is active
- Clear restores full collection — all GET only, no mutations

### License Filters Dialog
- `role="dialog"`, heading "Filter Licenses" (h4)
- Profile Search input: "Search profiles..."
- 100+ Profile options with `role="option"` and `aria-selected`
- Single-select: selecting one deselects others
- "All Profiles" selected by default
- Buttons: Clear and Select
- Escape closes dialog; focus returns to Filters button
- Outside click dismisses

### Profile Filter API
- `productProfileIds` parameter added to `GET /api/users/f` when Select clicked
- Combined with `hardwareIds` for intersection filtering

### Toolbar State
- Download, Email, Add License: **all disabled** in every read-only state observed
- No explicit user selection mechanism required — buttons remain disabled

### Network Safety
- All requests observed: GET only
- No POST, PUT, PATCH, DELETE during any search/filter operation

---

## Spec Structure (5 describe groups)

1. **License Panel Baseline** (10 tests: SUD-1122–1123, 1134, 1139–1141, 1158–1161)
2. **Hardware ID Search** (13 tests: SUD-1124–1129, 1143–1144, 1155–1157)
3. **License Filters Dialog** (10 tests: SUD-1130–1138, 1149–1150)
4. **Profile Selection** (4 tests: SUD-1145–1148)
5. **Search and Filter Combinations** (4 tests: SUD-1151–1154)
6. **Network and Safe Restoration** (2 tests: SUD-1142, 1162)

---

## Page Object Methods Added

| Method | Purpose |
|--------|---------|
| `getVisibleLicenseCards()` | All visible license cards |
| `setLicenseSearch(value)` | Fill HWID search input |
| `clearLicenseSearch()` | Clear HWID search |
| `getFirstVisibleHardwareId()` | Runtime HWID from first card |
| `getAllVisibleHardwareIds()` | All visible HWIDs |
| `getAllVisibleAssignedUsers()` | All assigned user names |
| `getLicenseDeleteButtons()` | Delete license buttons |
| `openLicenseFilters()` | Open Filters dialog |
| `closeLicenseFilters()` | Close via Escape |
| `dismissLicenseFiltersViaEscape()` | Escape key dismiss |
| `getLicenseFilterDialog()` | Filter dialog locator |
| `restoreLicensePanelDefaultState()` | Full safe restoration |

---

## Checklist

| Status | Details |
|--------|---------|
| Rows appended | 1153–1193 (41 rows) |
| Plan Status | Reviewed |
| Script Status | Generated |
| Execution Status | Not Run |

---

## File Manifest

```
plans/user-license-hub/LIMAS-SUD-1122 through LIMAS-SUD-1162-ulh-h-license-search-filters.md (41 files)
tests/user-license-hub/user-license-hub-license-search-filters.spec.ts
tests/pages/user-license-hub.page.ts (modified — added license search/filter methods)
docs/handoff/ulh-h-findings.md
docs/handoff/ulh-h-handoff.md
```

---

## Verification

- 41 plans ✓
- 41 test blocks ✓
- 41 checklist rows (1153–1193) ✓
- 1 grouped spec ✓
- Page object extended with 12 methods ✓
- No hardcoded values ✓
- No data-changing requests ✓
- Safe restoration in afterEach ✓
- Browser remains open ✓