# PRF-E: Profiles — Manage Profile Features — Handoff

## Summary
28 tests (LIMAS-SUD-2318 to LIMAS-SUD-2345) covering the Features tab inside the Manage Profile dialog.

## Key Findings (Live Inspection)

### Features Tab Structure (Profile: AGCO ST122 / CAPI / Runtime)
- Tabpanel "Features" inside `dialog[aria-label="AGCO ST122 / CAPI / Runtime"]`
- Table: columns "Feature" and "All"
- Add Feature row: single `td[colspan="2"]` with `button[role="combobox"]` "Add feature..."
  - Click opens a **popover dialog** with search and `option` elements (not a listbox)
  - ~50+ feature options including: "Krypto", "GTS Modeler", "DPDU API KION", "DoIPGateway", etc.
  - Escape closes the popover
- 2 assigned features for this profile: "Krypto" (v1.9.9, Access Level default), "AGCO ST122 / CAPI / Runtime" (v9.99.999, Write)
- Below table: "Create Feature" and "Save" buttons (both enabled)
- Close button in dialog top-right

### Feature Row Structure
Each row has 2 cells:
- **Cell 1**: Feature name as text + Remove button (SVG icon button, no text)
- **Cell 2**: Two comboboxes — Version (first), Access Level (second)

### Combobox Behavior
- Version: click opens options, shows current persisted value (e.g. "1.9.9")
- Access Level: click opens options, shows current value or placeholder "Access Level"
- Both use `role="option"` for dropdown items

### Save Behavior
- Save is **always enabled** — no client-side disable logic
- Server-side validation handles incomplete assignments

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/profiles/profiles-manage-features.spec.ts` |
| POM | `tests/pages/profiles.page.ts` (+23 loc: popover locators, rowByName, rowCount) |
| Plans | `plans/profiles/` (28 files: LIMAS-SUD-2318 to LIMAS-SUD-2345) |
| Handoff | `docs/handoff/prf-e-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (374 rows) |
| Index | `docs/handoff/generated-test-index.md` |

## POM Additions

```typescript
// Add Feature popover
manageFeaturesAddPopover: dialog with role="option" elements
manageFeaturesAddSearch: textbox inside popover
manageFeaturesAddOptions: all role="option" elements

// Row accessors
manageFeaturesRowByName(name): find row by feature name
manageFeaturesRowCount(): count feature rows excluding Add Feature row
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `manageFeaturesAddCombo` | `tabpanel(name:'Features').getByRole('combobox')` |
| `manageFeaturesAddPopover` | `page.getByRole('dialog').filter({has: page.getByRole('option')})` |
| `manageFeaturesAddOptions` | `manageFeaturesAddPopover.getByRole('option')` |
| `manageFeaturesRowVersion` | `row.locator('td:nth(1)').getByRole('combobox').first()` |
| `manageFeaturesRowAccess` | `row.locator('td:nth(1)').getByRole('combobox').last()` |
| `manageFeaturesRowRemove` | `row.locator('td:first-child').locator('button')` |
| `manageFeaturesRowByName` | `tbody tr` filtered by first `td` text match |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Features Tab Shell | 5 | 2318-2322 |
| Existing Feature Rows | 5 | 2323-2327 |
| Add Feature Control | 4 | 2328-2331 |
| Remove Control | 1 | 2332 |
| Version Dropdown | 2 | 2333-2334 |
| Access Level Dropdown | 2 | 2335-2336 |
| Save Behavior | 1 | 2337 |
| Create Feature Inspection | 1 | 2338 |
| Tab Switching and Dismissal | 4 | 2339-2342 |
| Accessibility | 2 | 2343-2344 |
| Synthetic Lifecycle | 1 | 2345 |

## Mutation Gates

Requires ALL of:
- `TEST_PROFILE_ALLOW_MUTATION=true`
- `TEST_PROFILE_ALLOW_FEATURE_MUTATION=true`
- `TEST_PROFILE_ALLOW_DELETE=true`
- Profile created by current automation run

Synthetic lifecycle gated behind `test.skip()` until Profile creation is implemented.

## State After Testing
- No existing Feature assignment changed
- No unsaved Feature row present
- Manage dialog closed
- Search empty, default sorting restored
- Browser visible and open