# FLC-H Handoff: Delete Floating License Configuration

## Scope

FLC-H covers the Delete action for Floating License Configurations — both the card-level three-dot menu and the bulk selection toolbar. Delete is **immediately destructive** with no confirmation dialog. Tests are gated behind `TEST_FLC_ALLOW_MUTATION` and `TEST_FLC_ALLOW_DELETE` flags. Existing configurations must never be deleted.

## Test Range

| Item | Value |
|------|-------|
| Test IDs | LIMAS-SUD-1993 – LIMAS-SUD-2008 |
| Count | 16 |
| Spec | `tests/floating-license-configurations/floating-license-configurations-delete.spec.ts` |
| Page Object | `tests/pages/floating-license-configurations.page.ts` |
| Plans | `plans/floating-license-configurations/LIMAS-SUD-1993-*.md` through `LIMAS-SUD-2008-*.md` |
| Checklist | Rows appended to `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` |

## Describe Blocks

### 1. Card-Menu Delete (4 tests)
- **LIMAS-SUD-1993**: Delete menu item visibility in three-dot menu
- **LIMAS-SUD-1994**: Delete role is `menuitem`
- **LIMAS-SUD-1995**: Delete receives keyboard focus
- **LIMAS-SUD-1996**: No confirmation dialog exists — no `dialog` or `alertdialog` role

### 2. Bulk Delete (4 tests)
- **LIMAS-SUD-1997**: Delete button visible in selection toolbar after card selection
- **LIMAS-SUD-1998**: Delete enabled when cards selected
- **LIMAS-SUD-1999**: Selection count reflects selected cards
- **LIMAS-SUD-2000**: No confirmation dialog for bulk delete

### 3. Controlled Delete Lifecycle (2 tests)
- **LIMAS-SUD-2001**: Gated card-menu delete lifecycle — create, delete, verify count returns
- **LIMAS-SUD-2002**: Delete returns configuration count to original value

### 4. Failure Recovery Plans (3 tests, all skipped)
- **LIMAS-SUD-2003**: Unauthorized (401/403) handled gracefully
- **LIMAS-SUD-2004**: Configuration not found (404) handled gracefully
- **LIMAS-SUD-2005**: Server error (500) handled gracefully

All skipped — require network interception, not manufactured failures.

### 5. Duplicate-Delete Prevention (1 test)
- **LIMAS-SUD-2006**: Already-absent card treated as idempotent success

### 6. Safe Restoration (2 tests)
- **LIMAS-SUD-2007**: Clean state after delete inspection — no selections, no toolbar
- **LIMAS-SUD-2008**: Original config count after lifecycle cleanup

## Live Inspection Findings

### Card-Menu Delete
- Accessed via three-dot `Actions for {name}` button → `menuitem "Delete"`
- No confirmation dialog, modal, or `alertdialog` appears
- Immediately destructive — no "Are you sure?" prompt

### Bulk Delete
- Visible as `button "Delete"` in the selection toolbar (alongside Select loaded, Clear, Dates, Capacity)
- Appears only when at least one card is selected
- Also immediately destructive — no confirmation

## POM Extensions

```typescript
// FLC-H: Delete action
readonly cardDeleteMenuItem: Locator;    // page.getByRole('menuitem', { name: 'Delete' })
readonly selectionDeleteButton: Locator; // page.getByRole('button', { name: 'Delete' })
```

## Mutation Gates

| Flag | Purpose |
|------|---------|
| `TEST_FLC_ALLOW_MUTATION` | Allows Create/Edit/Delete operations |
| `TEST_FLC_ALLOW_DELETE` | Specifically gates all Delete clicks |

Without both flags, all destructive tests call `test.skip()`.

## Immediate-Delete Safeguards

- No fixed indexes, `nth()`, or hardcoded card positions
- Cards selected by name via `getCardByName()`/`selectCardByName()`
- "Already absent" treated as idempotent success
- Existing configurations never targeted

## End State

After FLC-H:
- FLC total: 201 (185 + 16)
- Grand total: 2028
- Last ID: LIMAS-SUD-2008