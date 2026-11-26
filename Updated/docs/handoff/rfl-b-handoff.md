# RFL-B Handoff — Reports Floating Licenses Filters

## Batch

| Batch | Test ID Range | Count | Status |
|-------|--------------|-------|--------|
| RFL-B | LIMAS-SUD-1663 to LIMAS-SUD-1683 | 21 | Complete |

## Test ID Mapping

| Test ID | Plan | Spec | Test Title | Evidence | Execution |
|---------|------|------|------------|----------|-----------|
| LIMAS-SUD-1663 | plans/reports/LIMAS-SUD-1663-rfl-b-email-input-structure.md | tests/reports/reports-floating-licenses-filters.spec.ts | Email input — type=email, accessible name "Email", placeholder "Enter email", Enter adds chip | Playwright MCP | Not Run |
| LIMAS-SUD-1664 | plans/reports/LIMAS-SUD-1664-rfl-b-email-chip-remove.md | tests/reports/reports-floating-licenses-filters.spec.ts | Email chip — display, remove button, Clear all | Playwright MCP | Not Run |
| LIMAS-SUD-1665 | plans/reports/LIMAS-SUD-1665-rfl-b-email-client-side.md | tests/reports/reports-floating-licenses-filters.spec.ts | Email filter — client-side only, no server request | Playwright MCP network | Not Run |
| LIMAS-SUD-1666 | plans/reports/LIMAS-SUD-1666-rfl-b-hardware-filter-structure.md | tests/reports/reports-floating-licenses-filters.spec.ts | Hardware IDs — type=search, accessible name, placeholder, focus | Playwright MCP | Not Run |
| LIMAS-SUD-1667 | plans/reports/LIMAS-SUD-1667-rfl-b-product-profile-combobox.md | tests/reports/reports-floating-licenses-filters.spec.ts | Product Profile — combobox with checkbox options, accessible name | Playwright MCP | Not Run |
| LIMAS-SUD-1668 | plans/reports/LIMAS-SUD-1668-rfl-b-product-profile-selection.md | tests/reports/reports-floating-licenses-filters.spec.ts | Product Profile — selection pill, "Profiles: {count}" chip, enables Profile Role | Playwright MCP | Not Run |
| LIMAS-SUD-1669 | plans/reports/LIMAS-SUD-1669-rfl-b-profile-role-dependency.md | tests/reports/reports-floating-licenses-filters.spec.ts | Profile Role — disabled initially, enabled on profile select, reverts on clear | Playwright MCP | Not Run |
| LIMAS-SUD-1670 | plans/reports/LIMAS-SUD-1670-rfl-b-profile-role-selection.md | tests/reports/reports-floating-licenses-filters.spec.ts | Profile Role — combobox, role selection, "Roles: 1" chip | Playwright MCP | Not Run |
| LIMAS-SUD-1671 | plans/reports/LIMAS-SUD-1671-rfl-b-profile-clear-cascade.md | tests/reports/reports-floating-licenses-filters.spec.ts | Clearing profile clears role and disables it | Playwright MCP | Not Run |
| LIMAS-SUD-1672 | plans/reports/LIMAS-SUD-1672-rfl-b-expiration-date.md | tests/reports/reports-floating-licenses-filters.spec.ts | Expiration Date — native date input, calendar button, "Exp: {date}" chip | Playwright MCP | Not Run |
| LIMAS-SUD-1673 | plans/reports/LIMAS-SUD-1673-rfl-b-created-date.md | tests/reports/reports-floating-licenses-filters.spec.ts | License Created Date — native date input, calendar button | Playwright MCP | Not Run |
| LIMAS-SUD-1674 | plans/reports/LIMAS-SUD-1674-rfl-b-clear-panel.md | tests/reports/reports-floating-licenses-filters.spec.ts | Panel Clear — resets all filters, chips removed, Profile Role disabled | Playwright MCP | Not Run |
| LIMAS-SUD-1675 | plans/reports/LIMAS-SUD-1675-rfl-b-clear-all.md | tests/reports/reports-floating-licenses-filters.spec.ts | Clear all — multiple filter types, all reset atomically | Playwright MCP | Not Run |
| LIMAS-SUD-1676 | plans/reports/LIMAS-SUD-1676-rfl-b-combined-filters.md | tests/reports/reports-floating-licenses-filters.spec.ts | Combined filters — Email + Profile + Role + Date, all chips visible | Playwright MCP | Not Run |
| LIMAS-SUD-1677 | plans/reports/LIMAS-SUD-1677-rfl-b-filter-client-side-contract.md | tests/reports/reports-floating-licenses-filters.spec.ts | Filter API — client-side only, no POST or filter endpoint | Playwright MCP network | Not Run |
| LIMAS-SUD-1678 | plans/reports/LIMAS-SUD-1678-rfl-b-zero-result-count-stability.md | tests/reports/reports-floating-licenses-filters.spec.ts | Zero-result count stability — all filter states show 0 | Playwright MCP | Not Run |
| LIMAS-SUD-1679 | plans/reports/LIMAS-SUD-1679-rfl-b-filtered-empty-state.md | tests/reports/reports-floating-licenses-filters.spec.ts | Filtered empty state — message stable, Export disabled, no table | Playwright MCP | Not Run |
| LIMAS-SUD-1680 | plans/reports/LIMAS-SUD-1680-rfl-b-panel-state-focus.md | tests/reports/reports-floating-licenses-filters.spec.ts | Panel state — stays expanded, values persist after collapse/re-expand | Playwright MCP | Not Run |
| LIMAS-SUD-1681 | plans/reports/LIMAS-SUD-1681-rfl-b-filter-labels-a11y.md | tests/reports/reports-floating-licenses-filters.spec.ts | Filter labels — accessible names, types, disabled announcement, keyboard | Playwright MCP | Not Run |
| LIMAS-SUD-1682 | plans/reports/LIMAS-SUD-1682-rfl-b-chip-a11y.md | tests/reports/reports-floating-licenses-filters.spec.ts | Chip accessibility — accessible names, remove buttons, Clear all | Playwright MCP | Not Run |
| LIMAS-SUD-1683 | plans/reports/LIMAS-SUD-1683-rfl-b-filter-restoration.md | tests/reports/reports-floating-licenses-filters.spec.ts | Restoration — clear filters, Profile Role disabled, counts restored, route /reports | Playwright MCP | Not Run |

## Key Finding: Client-Side Filters

**All Floating Licenses filters are client-side only.** No server API request is triggered by applying, changing, or removing any filter. This is a fundamental architectural difference from Standard Licenses which uses POST-based server-side filtering via `/api/report/standardlicenses`.

### Filter Behaviors

| Filter | Trigger | Chip Format | Remove Button |
|--------|---------|-------------|---------------|
| Email | Enter key | "Email: {value}" | "Remove Email: {value}" |
| Hardware IDs | Enter key (type=search) | Not observed with 0 data | — |
| Product Profile | Combobox checkbox select | "Profiles: {count}" | "Remove Profiles: {count}" |
| Profile Role | Combobox checkbox select (after profile) | "Roles: {count}" | "Remove Roles: {count}" |
| Expiration Date | Tab/blur after fill | "Exp: {date}" | "Remove Exp: {date}" |
| License Created Date | Tab/blur after fill | Chip format TBD | — |

### Profile Role Dependency
- Disabled: placeholder "Select a profile first"
- Enabled: placeholder "Search roles" (after Profile selection)
- Clearing profile cascades to clear role and re-disable

### Clear Mechanisms
- **Panel Clear:** Button inside filter panel — resets all
- **Clear all:** Button in chip area — appears when any chip present
- Both work atomically with 0-data datasets

### No Server Filter API
- No POST endpoint for Floating Licenses filters
- No additional GET calls during filtering
- All data is pre-loaded via `GET /api/report/allfloatinglicenses?page=0&size=500`
- Filtering is performed client-side on the loaded content array

## Page Object Changes

Added to `tests/pages/reports.page.ts`:
- `getFloatingLicenseEmailFilter()`, `setFloatingLicenseEmailFilter()`
- `getFloatingLicenseHardwareFilter()`, `setFloatingLicenseHardwareFilter()`
- `getFloatingLicenseProfileOptions()`, `selectFloatingLicenseProfile()`
- `getFloatingLicenseRoleOptions()`, `selectFloatingLicenseRole()`
- `setFloatingLicenseExpirationDate()`, `setFloatingLicenseCreatedDate()`
- `clearFloatingLicenseFilters()`, `getFloatingLicenseFilterState()`
- `waitForFloatingLicenseFilterRequest()`, `verifyFloatingLicenseFilterState()`
- `restoreFloatingLicenseFilterState()`