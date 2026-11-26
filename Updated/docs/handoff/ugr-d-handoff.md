# UGR-D: Edit Group — Handoff

## Summary
21 tests (LIMAS-SUD-2484 to LIMAS-SUD-2504) covering the Edit dialog accessed via row-scoped "Edit" buttons. The dialog uses the same `input#name` / `textarea#comment` structure as Add Group/Subgroup, with prepopulated values.

## Key Findings (Live Inspection)

### Dialog Structure (Group: AGCO)
- `role="dialog"` with accessible name "Edit"
- Heading h2: "Edit"
- Description: "Edit group name"
- Group Name: `input#name`, prepopulated with current name, placeholder "Enter group name", no `maxlength`, not HTML `required`
- Comment: `textarea#comment`, prepopulated (may be empty), `rows=3`, no `maxlength`
- Buttons: **Cancel**, **Save**, **Close**
- Initial focus: Group Name input

### Save State (Same pattern as Add dialogs)
- **Save is always enabled** — no client-side dirty/validity gating
- Save stays enabled when dialog opens (no changes), after changing name, changing comment, or clearing name
- No dirty-state tracking

### Dismissal
- Cancel/Close/Escape all dismiss without persisting changes
- Cancel preserves original values in the table
- Reopening restores original persisted values (unsaved edits discarded)

### Root vs Subgroup
- Edit works identically on root groups and child groups
- Same dialog structure regardless of group type

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/user-groups/user-groups-edit.spec.ts` |
| POM | `tests/pages/user-groups.page.ts` (+19 loc: dialog locators + open/close/dismiss helpers) |
| Plans | `plans/ugr-d/` (21 files: LIMAS-SUD-2484 to LIMAS-SUD-2504) |
| Handoff | `docs/handoff/ugr-d-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (pending) |
| Index | `docs/handoff/generated-test-index.md` (pending) |

## POM Additions: UserGroupsPage

```typescript
// Edit dialog locators
editDialog, editHeading, editDescription, editNameInput,
editCommentInput, editCancelButton, editSaveButton, editCloseButton

// Methods
openEditDialog(row), closeEditDialog(), dismissEditDialog()
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `editDialog` | `page.getByRole('dialog', { name: 'Edit' })` |
| `editHeading` | `editDialog.getByRole('heading', { name: 'Edit', level: 2 })` |
| `editNameInput` | `editDialog.getByRole('textbox', { name: /Group Name/i })` |
| `editCommentInput` | `editDialog.getByRole('textbox', { name: 'Comment' })` |
| `editCancelButton` | `editDialog.getByRole('button', { name: 'Cancel' })` |
| `editSaveButton` | `editDialog.getByRole('button', { name: 'Save' })` |
| `editCloseButton` | `editDialog.getByRole('button', { name: 'Close' })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Dialog Structure | 5 | 2484-2488 |
| Prepopulated Values | 3 | 2489-2491 |
| Save State | 4 | 2492-2495 |
| Dismissal | 4 | 2496-2499 |
| Root vs Subgroup | 2 | 2500-2501 |
| Accessibility | 2 | 2502-2503 |
| Gated Lifecycle | 1 | 2504 |

## Mutation Gates

Synthetic update lifecycle requires:
- `TEST_USER_GROUP_ALLOW_MUTATION=true`
- `TEST_USER_GROUP_ALLOW_DELETE=true`

Currently gated behind `test.skip()` until create/delete utilities are implemented.

## State After Testing
- No dialog open
- No existing Group modified
- Search empty
- Collapse All applied
- Browser visible and open