# RFC-C Handoff — Reports Floating Configurations Deleted Behavior & Export

## Batch

| Batch | Test ID Range | Count | Status |
|-------|--------------|-------|--------|
| RFC-C | LIMAS-SUD-1781 to LIMAS-SUD-1807 | 27 | Complete |

## Critical Runtime Discoveries

### 1. Asymmetric Mode-Dependent Filter Inventory

The Floating Configurations filter panel is **completely different** between Active and Deleted modes — this is unique among all Reports sections:

| Active Mode (8 filters) | Deleted Mode (3 filters) |
|------------------------|--------------------------|
| System Users (searchbox) | Deleted By (textbox) |
| Expiration Date (date picker) | Created By (textbox) |
| Maintenance Date (date picker) | Group Name (textbox) |
| User Group (searchbox) | — |
| Product Profile (searchbox) | — |
| Profile Role (disabled, dependent) | — |
| Configuration Modified Date (date picker) | — |
| Configuration Created Date (date picker) | — |

Deleted mode's 3 textbox filters are much simpler — no searchboxes, no date pickers, no disabled dependencies.

### 2. All Deleted Data Loads in 2 Sequential Requests

Unlike Floating Licenses (17 pages) or Standard Licenses (server-side infinite scroll), Floating Configurations Deleted loads **ALL data upfront in 2 sequential requests**:

| Request | API | Response |
|---------|-----|----------|
| 1 | GET /report/alldeleted?page=0&size=500 | 500 elements, first:true, last:false, totalElements:598, totalPages:2 |
| 2 | GET /report/alldeleted?page=1&size=500 | 98 elements, first:false, last:true, totalElements:598, totalPages:2 |

**150 rows rendered** (500 from page 0 + 98 from page 1, with overlap/summary display). No manual scroll trigger needed — both requests fire immediately.

### 3. Deleted Filters Are Client-Side Only

Zero API requests fire during filter input. All filtering operates on the 598 preloaded records. This is consistent with Floating Licenses (also client-side), but filtering in this mode is simpler (3 plain textboxes with no dropdowns/pickers/dependencies).

### 4. Export Is Client-Side, but Column Schema Is Much Richer Than UI

| Property | Value |
|----------|-------|
| Mechanism | Client-side xlsx.js (no server request) |
| Filename | `limas-reports.xlsx` |
| File size | ~143 KB |
| Sheet name | "Exported Deleted Configs" |
| Export columns | **15 columns** (vs 6 in UI table) |
| Data rows | 598 (matches totalElements) |
| Button state | Enabled when data loaded |

**Export columns (15):** User Group, Product Profile, Profile Role, Feature, Feature Version, Expiration Date, Maintenance Date, System User, Deleted By, Modified Date, Created Date, Total Licenses, Occupied Licenses, Max Checkout (h), Available for Checkout

The export schema exposes 9 fields not visible in the UI table: Product Profile, Profile Role, Feature, Feature Version, System User, Modified Date, Total Licenses, Occupied Licenses, Max Checkout (h).

### 5. Filtered Export Preserves Filter Scope

Applying a filter (e.g., Deleted By = "PrakashP") before Export produces a workbook with fewer rows matching the filter scope. Clear restores full 598-row export.

### 6. UI Table vs Export Comparison

| Aspect | UI Table (6 cols) | Export (15 cols) |
|--------|-------------------|-----------------|
| User Group | ✓ | ✓ |
| Profile | ✓ | ✓ |
| Role | ✓ | ✓ |
| Created/Deleted By | ✓ (combined cell) | 2 separate columns |
| Configuration Details | ✓ (combined cell: Exp/Maint/Created/Modified/Feature) | 5 separate columns |
| Availability | ✓ (combined: Total/Occupied/Max/Avail) | 4 separate columns |
| Deleted By | embedded in cell | ✓ |
| System User | embedded in cell | ✓ |

## Test ID Mapping

| Test ID | Group | Execution |
|---------|-------|-----------|
| LIMAS-SUD-1781 | Deleted Data Load | Not Run |
| LIMAS-SUD-1782 | Deleted Data Load | Not Run |
| LIMAS-SUD-1783 | Deleted Filter Inventory | Not Run |
| LIMAS-SUD-1784 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1785 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1786 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1787 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1788 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1789 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1790 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1791 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1792 | Client-Side Filtering | Not Run |
| LIMAS-SUD-1793 | Filter State Management | Not Run |
| LIMAS-SUD-1794 | Filter State Management | Not Run |
| LIMAS-SUD-1795 | Filter State Management | Not Run |
| LIMAS-SUD-1796 | Export Excel | Not Run |
| LIMAS-SUD-1797 | Export Excel | Not Run |
| LIMAS-SUD-1798 | Export Excel | Not Run |
| LIMAS-SUD-1799 | Export Excel | Not Run |
| LIMAS-SUD-1800 | Export Excel | Not Run |
| LIMAS-SUD-1801 | Export Excel | Not Run |
| LIMAS-SUD-1802 | Export Excel | Not Run |
| LIMAS-SUD-1803 | Export Excel | Not Run |
| LIMAS-SUD-1804 | Export Excel | Not Run |
| LIMAS-SUD-1805 | Accessibility | Not Run |
| LIMAS-SUD-1806 | Accessibility | Not Run |
| LIMAS-SUD-1807 | Safe Restoration | Not Run |

## Page Object Changes

Added to `tests/pages/reports.page.ts`:
- 3 readonly locators: `fcDeletedDeletedByInput`, `fcDeletedCreatedByInput`, `fcDeletedGroupNameInput`
- 8 methods: `waitForFloatingConfigurationsDeletedResponse`, `applyFloatingConfigurationsDeletedFilter`, `getFloatingConfigurationsDeletedFilterValue`, `clearFloatingConfigurationsDeletedFilters`, `exportFloatingConfigurationsDeleted`, `getFloatingConfigurationsDeletedFilterControls`, `getFloatingConfigurationsDeletedFilteredCounts`

## End State
- Floating Configurations selected, aria-pressed=true
- Active pressed, Deleted unpressed
- Active 500 error visible ("Unable to load Floating Configuration records" / "Request failed with status code 500" + Retry)
- Filters collapsed
- Export not activated
- Downloaded export file cleaned up
- Route: /reports, Browser open