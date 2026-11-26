# Reports Standard Licenses RSL-F Handoff

## Batch: RSL-F — Export Excel

| Property | Value |
|---|---|
| Module | Reports |
| Sub-module | Standard Licenses |
| Batch | RSL-F |
| Access Profile | SUPER_USER_ADMIN_USER |
| Route | /reports |
| Date | 2026-11-16 |

## Live Inspection Summary

### A. Export Button Structure
- `<button>` with accessible name "Export Excel", `tabindex="0"`, in the toolbar group
- SVG icon present alongside text
- Enabled by default in Active mode with records
- State with zero filtered results, pending state, and Deleted availability to be inspected at runtime

### B. Active Unfiltered Export
- Click triggers a download event — one activation produces one download
- Export endpoint identified at runtime via `inspectStandardLicenseExportContract`
- No page navigation, no mode change, no filter change during export
- No data-changing requests triggered

### C. Export Contract (Runtime Only)
- HTTP method, sanitized endpoint path, query-parameter names recorded at runtime
- Response: status, Content-Type, Content-Disposition structure, Content-Length (when safe)
- No payload values, complete URLs, credentials, or exported contents recorded

### D. Filename and File Type
- Suggested filename is nonempty, contains no path separators or credential-like strings
- Extension `.xlsx` when confirmed by live download
- MIME type consistent with spreadsheet format

### E. Workbook Validation
- File opens without corruption via ExcelJS
- Contains ≥1 visible worksheet with nonempty sheet names
- Header row present with nonempty headers, column count > 0
- Data row count ≥ 0 (nonnegative)
- Not an HTML error page saved with .xlsx extension
- No formula or repair errors preventing open
- Redacted diagnostics only — no business data logged

### F. Unfiltered Export Scope
- No active core or date filters during export
- Represents Active Standard Licenses scope
- Workbook row count logically consistent with runtime export contract
- Compares with API total metadata when all records are exported

### G. Core-Filtered Export
- Product Profile filter from runtime table data
- Export request includes correct filter field name
- Workbook scope matches filtered contract

### H. Date-Filtered Export
- Expiration Date from runtime date helper
- Request carries correct date field and serialization
- Workbook scope consistent with filtered result

### I. Combined-Filter Export
- Product Profile + Profile Role + Expiration Date
- All selected filter fields in request
- Workbook scope matches combined-filter contract
- No stale unfiltered data returned

### J. Zero-Result Export
- Safe no-match filter applied
- If button disabled: no download triggerable
- If button enabled: header-only workbook produced
- No unfiltered records leaked

### K. Deleted Export
- Availability inspected at runtime — button present or absent in Deleted mode
- If available: single export, workbook validated, Deleted-mode contract verified
- If unavailable: documented, no speculative scripts
- Active restored after inspection

### L. Duplicate-Download Protection
- One click produces exactly one download event
- Repeated export uses safe naming, no overwrite
- No duplicate requests

### M. File Cleanup
- Every deterministic export uses unique test-scoped temp directory
- File deleted in finally, directory removed if empty
- No shared Downloads folder, no repository storage, no deletion of pre-existing files

### N. Accessibility
- Accessible name on export button, icon semantics (SVG aria-hidden or decorative)
- Keyboard focus, visible focus indicator, Enter/Space activation
- Non-color state indication (text + icon)
- Pending/completion/error announcements where observable

### O. Controlled Failures
- Three compact reviewed plans: unauthorized, server error, network interruption
- Plan Status: Reviewed, Script Status: Not Started, Execution Status: Not Run
- Reason: Requires controlled export-failure fixture

## File Index

| File | Status |
|---|---|
| tests/reports/reports-standard-licenses-export.spec.ts | New |
| tests/pages/reports.page.ts | Extended (export methods) |
| tests/helpers/download-helper.ts | New |
| docs/handoff/rsl-f-handoff.md | This file |
| plans/reports/LIMAS-SUD-1610-rsl-f-*.md through LIMAS-SUD-1635-rsl-f-*.md | New (26 plans) |

## Key API Contracts

| Use Case | Method | Endpoint (sanitized) | Query Params |
|---|---|---|---|
| Active Unfiltered | Runtime | `/api/report/...` (runtime) | `page`, `size` |
| Filtered Export | Runtime | `/api/report/...` (runtime) | `page`, `size` |
| Deleted Export | Runtime (if available) | `/api/report/...` (runtime) | `page`, `size` |

## Page Object Additions

| Method | Purpose |
|---|---|
| `getStandardLicenseExportButton()` | Returns export button locator |
| `getStandardLicenseExportState()` | Visible, enabled, role, accessible name, tabindex |
| `waitForStandardLicenseExport(action)` | Counts download events during action |
| `triggerStandardLicenseExport()` | Clicks export button |
| `prepareStandardLicenseFilteredExport(profile)` | Applies profile filter, returns filtered total |
| `prepareStandardLicenseDateFilteredExport(date)` | Applies date filter, returns filtered total |
| `prepareStandardLicenseCombinedFilteredExport(profile, role, date)` | Applies combined filter, returns filtered total |
| `restoreStandardLicenseExportState()` | Clears all filters, restores Active, collapses |
| `inspectStandardLicenseExportContract(action)` | Records sanitized export contract |

## Download Helpers

| Function | Purpose |
|---|---|
| `createExportTempDirectory(testId)` | Unique test-scoped temp dir |
| `captureExportDownload(page, dir, action)` | Waits for download, saves file |
| `inspectExportMetadata(download, filePath)` | Safe metadata: exists, size, filename, extension |
| `validateExportedWorkbookStructure(filePath)` | ExcelJS structural validation only |
| `cleanupExportArtifacts(filePath, dirPath)` | Delete file, remove empty dir |

## Notes
- 26 test cases generated (LIMAS-SUD-1610 through LIMAS-SUD-1635)
- 23 active deterministic tests, 3 skipped controlled-failure plans
- All counts, emails, profiles, roles, dates, filenames from runtime
- Export contract inspected live — no hardcoded endpoints or payloads
- Workbook validation uses ExcelJS for structural checks only
- No Floating Licenses or Floating Configurations activated
- No data-changing requests performed
- Tests not executed; CI/CD owns execution
- Browser remains open after inspection