# RFL-E Handoff — Reports Floating Licenses Export Excel

## Batch

| Batch | Test ID Range | Count | Status |
|-------|--------------|-------|--------|
| RFL-E | LIMAS-SUD-1723 to LIMAS-SUD-1740 | 18 | Complete |

## Key Runtime Observation: Client-Side Export

**The Floating Licenses Export is entirely client-side.** No server API request is triggered when clicking Export Excel. The application uses the `xlsx.js` library from `node_modules` to generate the workbook in-browser from the currently loaded data. This is a fundamental architectural difference from Standard Licenses, which uses a server-side export endpoint.

### Export Contract

| Property | Value |
|----------|-------|
| Trigger | Click Export Excel button (BUTTON element, not disabled) |
| Mechanism | Client-side xlsx.js generation |
| Server request | None |
| Download event | One per click |
| Suggested filename | `limas-reports.xlsx` |
| MIME type | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (expected) |
| File size | ~1.6 MB (unfiltered) |

### Workbook Structure

| Property | Value |
|----------|-------|
| Sheet count | 1 |
| Sheet name | "Exported Deleted Floating Licenses" (or similar truncated) |
| Columns | productProfile, profileRole, expirationDate, createdDate, deletedOn, email, hardwareId, contact |
| Header row | Yes (row 1) |
| Data rows | {runtimeExportedRows} (13,806 unfiltered) |
| Valid | Opens without corruption, non-HTML |

### Active Mode Export State

- Active has 0 records → Export Excel button is **disabled**
- Clicking disabled button fires no download
- Button has `disabled` attribute

### Deleted Mode Export State

- Deleted has 13,806 records → Export Excel button is **enabled**
- Button: `disabled=false`, `cursor=pointer`, accessible name "Export Excel"
- Tabindex=0 for keyboard access

### UI Preservation During Export

Client-side export preserves:
- Deleted mode stays selected
- Floating Licenses card stays pressed
- Filters remain empty and collapsed
- Counts unchanged
- Table content preserved
- Scroll position stable

## Test ID Mapping

| Test ID | Plan | Spec | Execution |
|---------|------|------|-----------|
| LIMAS-SUD-1723 | plans/reports/LIMAS-SUD-1723-rfl-e-export-active-disabled.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1724 | plans/reports/LIMAS-SUD-1724-rfl-e-export-deleted-enabled.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1725 | plans/reports/LIMAS-SUD-1725-rfl-e-export-keyboard.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1726 | plans/reports/LIMAS-SUD-1726-rfl-e-export-client-side-contract.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1727 | plans/reports/LIMAS-SUD-1727-rfl-e-export-unfiltered-scope.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1728 | plans/reports/LIMAS-SUD-1728-rfl-e-export-workbook-validation.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1729 | plans/reports/LIMAS-SUD-1729-rfl-e-export-ui-preservation.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1730 | plans/reports/LIMAS-SUD-1730-rfl-e-export-filename.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1731 | plans/reports/LIMAS-SUD-1731-rfl-e-export-mime-and-size.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1732 | plans/reports/LIMAS-SUD-1732-rfl-e-export-filtered-product-profile.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1733 | plans/reports/LIMAS-SUD-1733-rfl-e-export-filtered-date.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1734 | plans/reports/LIMAS-SUD-1734-rfl-e-export-zero-result-no-file.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1735 | plans/reports/LIMAS-SUD-1735-rfl-e-export-duplicate-protection.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1736 | plans/reports/LIMAS-SUD-1736-rfl-e-export-cleanup.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1737 | plans/reports/LIMAS-SUD-1737-rfl-e-export-a11y.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1738 | plans/reports/LIMAS-SUD-1738-rfl-e-export-restoration.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Run |
| LIMAS-SUD-1739 | plans/reports/LIMAS-SUD-1739-rfl-e-export-controlled-failure-unauthorized.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Started |
| LIMAS-SUD-1740 | plans/reports/LIMAS-SUD-1740-rfl-e-export-controlled-failure-server-error.md | tests/reports/reports-floating-licenses-export.spec.ts | Not Started |

## Page Object Changes

Added to `tests/pages/reports.page.ts` (RFL-E section):

- `getFloatingLicenseExportState()` → `{ visible, enabled, role, accessibleName, tabindex }`
- `waitForFloatingLicenseExport(action)` → `{ filename, downloadEventCount }`
- `triggerFloatingLicenseExport()` — clicks the FL Export button
- `verifyFloatingLicenseExportDisabledInActiveMode()` — asserts FL card, Active pressed, Export disabled

## End State
- Floating Licenses selected
- Active pressed, Deleted unpressed
- 0 records, 0 loaded · 0 total
- Empty-state visible, Export disabled
- Route: /reports
- Browser open