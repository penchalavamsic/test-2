# RFL-A Handoff — Reports Floating Licenses Shell

## Batch

| Batch | Test ID Range | Count | Status |
|-------|--------------|-------|--------|
| RFL-A | LIMAS-SUD-1636 to LIMAS-SUD-1662 | 27 | Complete |

## Test ID Mapping

| Test ID | Plan | Spec | Test Title | Evidence | Execution |
|---------|------|------|------------|----------|-----------|
| LIMAS-SUD-1636 | plans/reports/LIMAS-SUD-1636-rfl-a-floating-license-card-visibility.md | tests/reports/reports-floating-licenses-shell.spec.ts | Floating Licenses card — visible, button role, accessible name, enabled, aria-pressed="false" initially | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1637 | plans/reports/LIMAS-SUD-1637-rfl-a-floating-license-card-keyboard.md | tests/reports/reports-floating-licenses-shell.spec.ts | Floating Licenses card — keyboard focus and focus-visible indicator | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1638 | plans/reports/LIMAS-SUD-1638-rfl-a-floating-license-card-selection.md | tests/reports/reports-floating-licenses-shell.spec.ts | Floating Licenses card — mouse activation, selected state, Standard unselected, route /reports | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1639 | plans/reports/LIMAS-SUD-1639-rfl-a-single-card-selected.md | tests/reports/reports-floating-licenses-shell.spec.ts | Exactly one report card selected after Floating Licenses activation | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1640 | plans/reports/LIMAS-SUD-1640-rfl-a-active-control-structure.md | tests/reports/reports-floating-licenses-shell.spec.ts | Active control — visible, enabled, pressed, "Floating license mode" group | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1641 | plans/reports/LIMAS-SUD-1641-rfl-a-deleted-control-structure.md | tests/reports/reports-floating-licenses-shell.spec.ts | Deleted control — visible, enabled, unpressed, keyboard reachable, focus-visible (no activation) | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1642 | plans/reports/LIMAS-SUD-1642-rfl-a-active-already-selected.md | tests/reports/reports-floating-licenses-shell.spec.ts | Active already-selected — no duplicate request, state unchanged | Playwright MCP network | Not Run |
| LIMAS-SUD-1643 | plans/reports/LIMAS-SUD-1643-rfl-a-record-count.md | tests/reports/reports-floating-licenses-shell.spec.ts | Toolbar record count — nonnegative, stable, Floating Licenses specific | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1644 | plans/reports/LIMAS-SUD-1644-rfl-a-loaded-total-counts.md | tests/reports/reports-floating-licenses-shell.spec.ts | Loaded/total counts — nonnegative, loaded ≤ total, consistent | Playwright MCP + API | Not Run |
| LIMAS-SUD-1645 | plans/reports/LIMAS-SUD-1645-rfl-a-toolbar-group-order.md | tests/reports/reports-floating-licenses-shell.spec.ts | Toolbar grouping — "Floating license mode" group, control order | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1646 | plans/reports/LIMAS-SUD-1646-rfl-a-filters-button-toggle.md | tests/reports/reports-floating-licenses-shell.spec.ts | Filters button — expand, collapse, focus stable, no request triggered | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1647 | plans/reports/LIMAS-SUD-1647-rfl-a-filter-panel-shell.md | tests/reports/reports-floating-licenses-shell.spec.ts | Filter panel — heading, internal scrolling, Clear button visible | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1648 | plans/reports/LIMAS-SUD-1648-rfl-a-filter-controls-inventory.md | tests/reports/reports-floating-licenses-shell.spec.ts | Filter controls inventory — 6 Floating License filters, types, labels, initial values | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1649 | plans/reports/LIMAS-SUD-1649-rfl-a-profile-role-dependency.md | tests/reports/reports-floating-licenses-shell.spec.ts | Profile Role dependency — disabled, placeholder "Select a profile first" | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1650 | plans/reports/LIMAS-SUD-1650-rfl-a-clear-initial-state.md | tests/reports/reports-floating-licenses-shell.spec.ts | Clear initial state — activate with empty filters, filters stay empty, counts stable | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1651 | plans/reports/LIMAS-SUD-1651-rfl-a-export-button-structure.md | tests/reports/reports-floating-licenses-shell.spec.ts | Export Excel button — structure, disabled state when zero records, SVG, accessible name | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1652 | plans/reports/LIMAS-SUD-1652-rfl-a-table-empty-state.md | tests/reports/reports-floating-licenses-shell.spec.ts | Empty state — no table, "No Floating License records found" message | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1653 | plans/reports/LIMAS-SUD-1653-rfl-a-initial-api-contract.md | tests/reports/reports-floating-licenses-shell.spec.ts | Initial API contract — GET, endpoint, query params, 200, JSON, response shape | Playwright MCP network | Not Run |
| LIMAS-SUD-1654 | plans/reports/LIMAS-SUD-1654-rfl-a-pagination-mechanism.md | tests/reports/reports-floating-licenses-shell.spec.ts | Pagination mechanism — page/size params, first/last flags, metadata consistency | Playwright MCP network | Not Run |
| LIMAS-SUD-1655 | plans/reports/LIMAS-SUD-1655-rfl-a-request-count-safety.md | tests/reports/reports-floating-licenses-shell.spec.ts | Request count — exactly one GET, no PUT/PATCH/DELETE/export | Playwright MCP network | Not Run |
| LIMAS-SUD-1656 | plans/reports/LIMAS-SUD-1656-rfl-a-loading-state.md | tests/reports/reports-floating-licenses-shell.spec.ts | Loading state — indicator, toolbar visible, count update, indicator disappearance | Playwright MCP snapshot | Not Run |
| LIMAS-SUD-1657 | plans/reports/LIMAS-SUD-1657-rfl-a-infinite-scroll-mechanism.md | tests/reports/reports-floating-licenses-shell.spec.ts | Infinite-scroll container and sentinel — identify without triggering next batch | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1658 | plans/reports/LIMAS-SUD-1658-rfl-a-empty-state-a11y.md | tests/reports/reports-floating-licenses-shell.spec.ts | Empty-state accessibility — role=group, paragraph text | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1659 | plans/reports/LIMAS-SUD-1659-rfl-a-card-selected-a11y.md | tests/reports/reports-floating-licenses-shell.spec.ts | Report card selected-state accessibility — aria-pressed, non-color indicator | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1660 | plans/reports/LIMAS-SUD-1660-rfl-a-active-deleted-a11y.md | tests/reports/reports-floating-licenses-shell.spec.ts | Active/Deleted accessibility — group role, aria-pressed, keyboard, group name | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1661 | plans/reports/LIMAS-SUD-1661-rfl-a-filters-export-a11y.md | tests/reports/reports-floating-licenses-shell.spec.ts | Filters and Export accessibility — labels, types, disabled announcement, aria-expanded gap | Playwright MCP evaluate | Not Run |
| LIMAS-SUD-1662 | plans/reports/LIMAS-SUD-1662-rfl-a-safe-restoration.md | tests/reports/reports-floating-licenses-shell.spec.ts | Safe restoration — Floating Licenses selected, Active pressed, filters collapsed/empty, counts restored, route /reports | Playwright MCP snapshot | Not Run |

## API Contract

- **Endpoint:** `GET /limas/api/report/allfloatinglicenses`
- **Query params:** `page`, `size`
- **Response:** Spring Page JSON with `totalElements`, `numberOfElements`, `content`, `pageable`, `last`, `first`, `totalPages`, `size`, `number`
- **Active/Deleted:** Controlled by UI mode toggle; Active uses `allfloatinglicenses`

## Key Findings

- Floating Licenses filter inventory: 6 controls (vs 9 for Standard Licenses)
- Missing from Standard: Maintenance Date, User Group, License Modified Date
- Mode group name: "Floating license mode" (vs "License mode" for Standard)
- Export button disabled when record count is 0
- Profile Role disabled by default (dependency on Product Profile)
- Filters button lacks `aria-expanded` (accessibility gap, same as Standard)
- Cards use `aria-pressed` for selection state
- Empty state: "No Floating License records found" with explanatory message
- API uses page=0&size=500 for initial request

## Page Object Changes

- Added: `floatingLicensesApiPath`, Floating Licenses locators (mode group, tabs, record count, table, filters, scroll)
- Added methods: `selectFloatingLicensesReport()`, `getFloatingLicenseActiveMode()`, `getFloatingLicenseDeletedMode()`, `getFloatingLicenseRecordCount()`, `getFloatingLicenseLoadedState()`, `parseFloatingLicenseLoadedTotal()`, `getFloatingLicenseFilterControls()`, `getFloatingLicenseExportButton()`, `getFloatingLicenseTable()`, `getFloatingLicenseHeaders()`, `getVisibleFloatingLicenseRows()`, `getFloatingLicenseScrollContainer()`, `getFloatingLicenseScrollMetrics()`, `waitForFloatingLicenseInitialRequest()`, `captureFloatingLicenseInitialMetadata()`, `restoreFloatingLicenseInitialState()`