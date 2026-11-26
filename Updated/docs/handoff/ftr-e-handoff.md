# FTR-E: Delete Feature — Handoff

## Summary
21 tests (LIMAS-SUD-2144 to LIMAS-SUD-2164) covering the Delete Feature behavior on the Features page.

## Key Findings (Live Inspection)

### Delete Button State
- **Disabled** on any feature with >= 1 profile association. Tooltip: "Cannot delete: Feature is associated with profiles"
- **Enabled** on features with 0 profiles. No tooltip.
- This rule applies uniformly to both root and child features — the sole driver is profile count.
- All existing features have profiles, so Delete is universally disabled in the current data set except for 3 features: "K-DCP License Library Test Release Floating", "K-DCP License Library Test Release", "Test_feature_09".

### Delete Button Semantics
- Role: `button`, accessible name: "Delete"
- Destructive styling: `text-destructive` class
- No `tabindex` (relies on native button tab order)
- `disabled:pointer-events-none` when disabled

### Confirmation Dialog (when Delete is enabled)
- Role: `alertdialog`, accessible name: "Are you sure?"
- Heading: h2 "Are you sure?"
- Warning: "This will permanently delete the feature \"{name}\" and all its child features. This action cannot be undone."
- Controls: Cancel (focused first), Delete
- Escape dismisses
- Cancel dismisses without side effects

### Mutation Gates
- `TEST_FEATURE_ALLOW_MUTATION=true`
- `TEST_FEATURE_ALLOW_DELETE=true`
- Both must be set for the synthetic lifecycle test to run (LIMAS-SUD-2163)

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/features/features-delete.spec.ts` |
| POM (extended) | `tests/pages/features.page.ts` (+6 locators, +1 method) |
| Plans | `plans/ftr-e/` (21 files) |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (21 rows appended) |
| Index | `docs/handoff/generated-test-index.md` |

## POM Additions

```typescript
// FTR-E: Delete Feature confirmation dialog
readonly deleteConfirmDialog: Locator;       // alertdialog "Are you sure?"
readonly deleteConfirmHeading: Locator;      // h2 "Are you sure?"
readonly deleteConfirmWarning: Locator;      // /permanently delete/i
readonly deleteConfirmCancelButton: Locator; // button "Cancel"
readonly deleteConfirmDeleteButton: Locator; // button "Delete"

// New method
async getFirstRowWithNoProfiles(): Promise<Locator | null>
```

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Delete Button Visibility and Semantics | 3 | 2144-2146 |
| Delete Disabled / Enabled Rules | 9 | 2147-2155 |
| Confirmation Dialog | 7 | 2156-2162 |
| Gated Lifecycle | 1 | 2163 |
| Safe Restoration | 1 | 2164 |

## State After Testing
- No existing features changed or deleted
- Search empty
- Hierarchy restored
- No dialog open
- Synthetic features cleaned up (if mutation enabled)