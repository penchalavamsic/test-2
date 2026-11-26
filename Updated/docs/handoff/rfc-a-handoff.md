# RFC-A Handoff — Reports Floating Configurations Shell & Error State

## Batch

| Batch | Test ID Range | Count | Status |
|-------|--------------|-------|--------|
| RFC-A | LIMAS-SUD-1741 to LIMAS-SUD-1762 | 22 | Complete |

## Critical Runtime Discovery: 500 Error on Active API

The Floating Configurations Active API returns **500 Internal Server Error** in this environment:

- **Endpoint:** `GET /limas/api/report/all?page=0&size=500`
- **Response:** 500 Internal Server Error
- **No Spring Page envelope** (no totalElements, no content, no totalPages)
- **This is NOT a client-side or network issue** — the server explicitly returns 500

The endpoint path is notably different from other reports (`/api/report/all` vs `/api/report/allfloatinglicenses`).

### Error State UI

| Property | Value |
|----------|-------|
| Primary message | "Unable to load Floating Configuration records" |
| Secondary message | "Request failed with status code 500" |
| Retry button | Present, accessible name "Retry" |
| Table | Not rendered |
| Mode controls | Remain usable (Active/Deleted) |
| Filters panel | Available, can expand |
| Export button | **Enabled** (may be a bug — enabled despite error with 0 records) |
| Loaded/total text | Not rendered |
| Record count | "0 records" |

### Retry Behavior
- Clicking Retry fires a new `GET /limas/api/report/all?page=0&size=500`
- Does not change mode or card selection
- Multiple retries allowed
- UI remains responsive throughout

## Filter Inventory (8 Filters)

| # | Filter | Control Type | Placeholder/Note |
|---|--------|-------------|------------------|
| 1 | System Users | searchbox | — |
| 2 | Expiration Date | textbox + calendar | Native date input |
| 3 | Maintenance Date | textbox + calendar | Native date input |
| 4 | User Group | searchbox | Placeholder: "Search groups" |
| 5 | Product Profile | searchbox | Placeholder: "Search profiles" |
| 6 | Profile Role | searchbox (disabled) | Placeholder: "Select a profile first" — depends on Product Profile |
| 7 | Configuration Modified Date | textbox + calendar | Native date input |
| 8 | Configuration Created Date | textbox + calendar | Native date input |

### Key Differences from Other Reports

| Aspect | Standard Licenses | Floating Licenses | Floating Configurations |
|--------|-------------------|-------------------|------------------------|
| Active API | POST /report/standardlicenses | GET /report/allfloatinglicenses | GET /report/all |
| Filter count | 9 | 6 | 8 |
| User filter | Email | Email | System Users |
| Date filters | License Modified, License Created | Expiration Date, License Created Date | Expiration, Maintenance, Config Modified, Config Created |
| Group filter | Group Name | — | User Group |
| Profile Role dep | Yes (on Product Profile) | Yes (on Product Profile) | Yes (on Product Profile) |

### Filters Panel A11y Gap

The Filters button lacks `aria-expanded` — same gap observed in Standard Licenses and Floating Licenses.

## Mode Controls

| Property | Value |
|----------|-------|
| Group | `role="group"`, `aria-label="Configuration mode"` |
| Active button | Pressed-by-default, not disabled, tabindex present |
| Deleted button | Not pressed, not disabled, tabindex present |
| State indicator | `aria-pressed` (not color-only) |
| Already-selected | Clicking Active when already pressed fires no duplicate request |

## Card State

| Card | aria-pressed | cursor | accessible name |
|------|-------------|--------|-----------------|
| Standard Licenses | false | pointer | "Standard Licenses Standard and deleted license records" |
| Floating Licenses | false | pointer | "Floating Licenses Floating-license usage records" |
| Floating Configurations | true | pointer | "Floating Configurations Floating-license configuration records" |

## Export Button

| Property | Value |
|----------|-------|
| Element | `<button>`, not disabled |
| Keyboard | Tab reachable (tabindex) |
| Enabled | true (even during 500 error with 0 records — behavioral observation) |
| Click | NOT triggered during this batch |

## Test ID Mapping

| Test ID | Group | Execution |
|---------|-------|-----------|
| LIMAS-SUD-1741 | Card Selection | Not Run |
| LIMAS-SUD-1742 | Card Selection | Not Run |
| LIMAS-SUD-1743 | Card Selection | Not Run |
| LIMAS-SUD-1744 | Active Mode | Not Run |
| LIMAS-SUD-1745 | Active Mode | Not Run |
| LIMAS-SUD-1746 | Active Mode | Not Run |
| LIMAS-SUD-1747 | Active Mode | Not Run |
| LIMAS-SUD-1748 | Toolbar and Counts | Not Run |
| LIMAS-SUD-1749 | Toolbar and Counts | Not Run |
| LIMAS-SUD-1750 | Toolbar and Counts | Not Run |
| LIMAS-SUD-1751 | Filters Panel | Not Run |
| LIMAS-SUD-1752 | Filters Panel | Not Run |
| LIMAS-SUD-1753 | Filters Panel | Not Run |
| LIMAS-SUD-1754 | Filters Panel | Not Run |
| LIMAS-SUD-1755 | Filters Panel | Not Run |
| LIMAS-SUD-1756 | Export Button | Not Run |
| LIMAS-SUD-1757 | Error State | Not Run |
| LIMAS-SUD-1758 | Error State | Not Run |
| LIMAS-SUD-1759 | Error State | Not Run |
| LIMAS-SUD-1760 | Error State | Not Run |
| LIMAS-SUD-1761 | Accessibility | Not Run |
| LIMAS-SUD-1762 | Safe Restoration | Not Run |

## Page Object Changes

Added to `tests/pages/reports.page.ts`:
- 12 readonly declarations (floatingConfigurationsCard, floatingConfigurationsApiPath, fcModeGroup, fcActiveTab, fcDeletedTab, fcRecordCountText, fcLoadedTotalText, fcFiltersButton, fcFilterPanel, fcExportButton, fcErrorState, fcClearFiltersButton, fcRetryButton)
- 12 methods: selectFloatingConfigurationsReport, getFloatingConfigurationsActiveMode/DeletedMode/Mode, getFloatingConfigurationsRecordCount, getFloatingConfigurationsLoadedState, expandFloatingConfigurationsFilters, collapseFloatingConfigurationsFilters, getFloatingConfigurationsFilterControls, getFloatingConfigurationsExportState, waitForFloatingConfigurationsRequest, restoreFloatingConfigurationsInitialState

## End State
- Floating Configurations selected, aria-pressed=true
- Active pressed, Deleted unpressed
- Error state visible (500), Retry button present
- Filters collapsed
- Export not activated
- Route: /reports, Browser open