# UGR-E: Delete Group — Handoff

## Summary
18 tests (LIMAS-SUD-2505 to LIMAS-SUD-2522) covering the Delete flow. Covers
the row-scoped Delete button, `alertdialog` confirmation, context-sensitive
warning text (leaf vs parent-with-children), dismissal, state restoration, and
one gated lifecycle test.

## Key Findings (Live Inspection)

### Delete Button
- Icon-only button using `svg.lucide-trash2`, class `text-destructive`
- No `aria-label`, no `title`, no text content — distinguishable beyond color
  only via the trash icon
- **Always enabled** on every row observed (root, subgroup, with/without children)
- Keyboard reachable

### Confirmation Dialog (`role="alertdialog"`)
- Accessible name: "Delete Group?"
- Heading h2: "Delete Group?"
- Body text: **context-dependent** warning
- Buttons: **Cancel** (initially focused) + **Delete** (always enabled)
- No "X"/Close button, no group name in the confirmation

### Warning Text by Group Type
| Scenario | Warning Text |
|----------|-------------|
| Root without children (AGCO) | "This action cannot be undone." |
| Root with children (Default) | "All subgroups will be promoted to parent level." |
| Subgroup without children (AGCO1 under Default) | "This action cannot be undone." |
| Subgroup with children (Encon under APAC) | "All subgroups will be promoted to parent level." |

**Rule:** The warning depends solely on whether the group being deleted has
immediate children — not on its position in the hierarchy.

### Dismissal
- Cancel: dismisses dialog, group remains in table with same name
- Escape: dismisses dialog
- No "Close" button in alertdialog
- Focus returns to page naturally

### State After Cancellation
- Search still works (finds groups by name)
- Hierarchy expand/collapse still works
- No mutation to any existing group

## Delete API Contract (Observed)
- `DELETE /limas/api/usergroups/{id}` is the presumed endpoint
- Confirmation is purely client-side; no API call on Cancel
- Gated lifecycle uses `TEST_USER_GROUP_ALLOW_MUTATION=true` +
  `TEST_USER_GROUP_ALLOW_DELETE=true`

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/user-groups/user-groups-delete.spec.ts` |
| POM | `tests/pages/user-groups.page.ts` (+13 loc: delete dialog locators + 2 helpers) |
| Plans | `plans/ugr-e/` (18 files: LIMAS-SUD-2505 to LIMAS-SUD-2522) |
| Handoff | `docs/handoff/ugr-e-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (pending) |
| Index | `docs/handoff/generated-test-index.md` (pending) |

## POM Additions

```typescript
// Delete confirmation dialog locators
deleteDialog, deleteHeading, deleteWarning, deleteCancelButton, deleteConfirmButton

// Methods
openDeleteDialog(row), cancelDeleteDialog()
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `deleteDialog` | `page.getByRole('alertdialog', { name: 'Delete Group?' })` |
| `deleteHeading` | `deleteDialog.getByRole('heading', { name: 'Delete Group?', level: 2 })` |
| `deleteWarning` | `deleteDialog.locator('p')` |
| `deleteCancelButton` | `deleteDialog.getByRole('button', { name: 'Cancel' })` |
| `deleteConfirmButton` | `deleteDialog.getByRole('button', { name: 'Delete' })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Delete Button | 4 | 2505-2508 |
| Confirmation Dialog | 4 | 2509-2512 |
| Warning Text | 3 | 2513-2515 |
| Dismissal | 3 | 2516-2518 |
| State After Cancellation | 2 | 2519-2520 |
| Accessibility | 1 | 2521 |
| Gated Lifecycle | 1 | 2522 |

## Mutation Gates

Gated lifecycle requires:
- `TEST_USER_GROUP_ALLOW_MUTATION=true`
- `TEST_USER_GROUP_ALLOW_DELETE=true`

Currently skipped until create/delete utilities are implemented.

## Safety Rules Followed
- No existing groups deleted
- No hardcoded group names
- No `waitForTimeout` or fixed sleeps
- Cleanup in `afterEach` ensures no alertdialog remains
- Collapse All + clear search in `beforeEach` and `afterEach`