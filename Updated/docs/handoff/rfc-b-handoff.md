# RFC-B Handoff — Reports Floating Configurations Error & Deleted Mode

## Batch

| Batch | Test ID Range | Count | Status |
|-------|--------------|-------|--------|
| RFC-B | LIMAS-SUD-1763 to LIMAS-SUD-1780 | 18 | Complete |

## Critical Runtime Discoveries

### Asymmetric Active/Deleted API Behavior

The Floating Configurations report has a severe asymmetry between Active and Deleted modes:

| Aspect | Active | Deleted |
|--------|--------|---------|
| API endpoint | `GET /api/report/all?page=0&size=500` | `GET /api/report/alldeleted?page=0&size=500` |
| HTTP status | **500 Internal Server Error** | **200 OK** |
| Data | No records (server error) | 598 records (Spring Page envelope) |
| Table | Not rendered (error state) | 6 columns, 100 rows initially loaded |
| UI state | "Unable to load Floating Configuration records" / "Request failed with status code 500" + Retry | "100 loaded · 598 total" |
| Export | Enabled (behavioral observation) | Enabled |

**Key insight:** Active is broken (500 error), but Deleted works perfectly with full data. This means the Deleted mode is testable and provides rich data for row-structure and table validation.

### Deleted Table Structure (6 Columns)

| # | Header | Runtime Example |
|---|--------|----------------|
| 1 | User Group | Pune, Munich, Bangalore, Test, KPIT, etc. |
| 2 | Profile | DatabaseDesigner NG, Diagnostic Communicator, OTX-Authoring, etc. |
| 3 | Role | Standard, 1.05, 2.03, Intern, Viewer, etc. |
| 4 | Created / Deleted By | "Created: TeamPune / Deleted: PrakashP" (two-value cell) |
| 5 | Configuration Details | "Exp: 16 Nov 2018 / Maint: 16 Nov 2018 / Created: 17 Oct 2018 / Modified: 17 Oct 2018 / Feature: DatabaseDesigner NG · 2.03.999" |
| 6 | Availability | "Total: 0 / Occupied: 0 / Max checkout: - / Available" (or Unavailable) |

### Row Sub-Fields

Each Configuration Details cell contains 5 sub-fields:
- Exp (expiration date)
- Maint (maintenance date)
- Created (configuration creation date)
- Modified (configuration modification date)
- Feature (product name + version)

Each Availability cell contains 4 sub-fields:
- Total
- Occupied
- Max checkout
- Status: Available or Unavailable

### Mode Switching Behavior

| Transition | API Called | Result |
|-----------|-----------|--------|
| Initial load (Active) | GET /report/all | 500 error |
| Active → Deleted | GET /report/alldeleted | 200, 598 records, 100 loaded, table rendered |
| Deleted → Active | GET /report/all | 500 error, table removed, counts reset to 0 |
| Deleted re-click | No request | State stable |

### Filters Panel Behavior Across Modes

- Filter panel state (expanded/collapsed) preserved across mode switches
- Filter inventory (8 controls) identical in both modes
- Profile Role dependency present in both modes
- Clear button present in both modes

### Export Button State

- **Active mode:** Enabled (even during 500 error with 0 records — behavioral observation)
- **Deleted mode:** Enabled when data loads

### Deleted Data Freshness

Each visit to Deleted mode triggers a fresh GET request. No stale caching. Active→Deleted transition always re-fetches.

## Test ID Mapping

| Test ID | Group | Execution |
|---------|-------|-----------|
| LIMAS-SUD-1763 | Active Error State | Not Run |
| LIMAS-SUD-1764 | Active Error State | Not Run |
| LIMAS-SUD-1765 | Deleted Mode Selection | Not Run |
| LIMAS-SUD-1766 | Deleted Mode Selection | Not Run |
| LIMAS-SUD-1767 | Deleted Mode Selection | Not Run |
| LIMAS-SUD-1768 | Deleted Table Structure | Not Run |
| LIMAS-SUD-1769 | Deleted Table Structure | Not Run |
| LIMAS-SUD-1770 | Deleted Mode State | Not Run |
| LIMAS-SUD-1771 | Mode Switching | Not Run |
| LIMAS-SUD-1772 | Mode Switching | Not Run |
| LIMAS-SUD-1773 | Mode Switching | Not Run |
| LIMAS-SUD-1774 | Mode Switching | Not Run |
| LIMAS-SUD-1775 | Mode Switching | Not Run |
| LIMAS-SUD-1776 | Filter and Mode Interplay | Not Run |
| LIMAS-SUD-1777 | Accessibility | Not Run |
| LIMAS-SUD-1778 | Accessibility | Not Run |
| LIMAS-SUD-1779 | Safe Restoration | Not Run |
| LIMAS-SUD-1780 | Data Freshness | Not Run |

## Page Object Changes

Added to `tests/pages/reports.page.ts`:
- 3 readonly declarations: `fcDeletedTable`, `fcDeletedRows`, `fcDeletedTableHeaders`, `floatingConfigurationsDeletedApiPath`
- 6 methods: `selectFloatingConfigurationsDeleted`, `getFloatingConfigurationsDeletedCounts`, `getFloatingConfigurationsDeletedTableHeaders`, `getFloatingConfigurationsDeletedRowComponents(rowIndex)`, `getFloatingConfigurationsDeletedRowCount`, `waitForFloatingConfigurationsDeletedRequest`

## End State
- Floating Configurations selected, aria-pressed=true
- Active pressed, Deleted unpressed
- Active 500 error visible (or loading to error)
- Filters collapsed
- Export not activated
- Route: /reports, Browser open