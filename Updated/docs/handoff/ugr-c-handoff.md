# UGR-C: Add Subgroup — Handoff

## Summary
21 tests (LIMAS-SUD-2463 to LIMAS-SUD-2483) covering the Add Subgroup dialog accessed via row-scoped "Add Subgroup" buttons. The dialog is structurally identical to Add Group (same `input#name`, `textarea#comment`, Save/Cancel/Close buttons). Only the accessible name ("Add Subgroup"), heading, and description differ.

## Key Findings (Live Inspection)

### Dialog Structure
- `role="dialog"` with accessible name "Add Subgroup" (via Radix `aria-label`)
- Heading h2: "Add Subgroup"
- Description: "Add a subgroup"
- Group Name: `input#name`, type="text", no `maxlength`, not HTML `required`, placeholder "Enter group name"
- Comment: `textarea#comment`, `rows=3`, no `maxlength`, placeholder "Enter group comment (optional)"
- Buttons: **Cancel**, **Save**, **Close**
- Initial focus: Group Name input

### Save State (Same as Add Group)
- **Save is always enabled** — no client-side gating
- Same validation behavior as Add Group dialog

### Parent Context
- Dialog opens from the row-scoped `button "Add Subgroup"` on any group row
- Works identically from different parent rows
- Button remains enabled after dialog dismissal

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/user-groups/user-groups-add-subgroup.spec.ts` |
| POM | `tests/pages/user-groups.page.ts` (+18 loc: dialog locators + open/close/dismiss helpers) |
| Plans | `plans/ugr-c/` (21 files: LIMAS-SUD-2463 to LIMAS-SUD-2483) |
| Handoff | `docs/handoff/ugr-c-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (pending) |
| Index | `docs/handoff/generated-test-index.md` (pending) |

## POM Additions: UserGroupsPage

```typescript
// Add Subgroup dialog locators
addSubgroupDialog, addSubgroupHeading, addSubgroupDescription,
addSubgroupNameInput, addSubgroupCommentInput, addSubgroupCancelButton,
addSubgroupSaveButton, addSubgroupCloseButton

// Methods
openAddSubgroupDialog(row), closeAddSubgroupDialog(), dismissAddSubgroupDialog()
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `addSubgroupDialog` | `page.getByRole('dialog', { name: 'Add Subgroup' })` |
| `addSubgroupHeading` | `addSubgroupDialog.getByRole('heading', { name: 'Add Subgroup', level: 2 })` |
| `addSubgroupNameInput` | `addSubgroupDialog.getByRole('textbox', { name: /Group Name/i })` |
| `addSubgroupCommentInput` | `addSubgroupDialog.getByRole('textbox', { name: 'Comment' })` |
| `addSubgroupCancelButton` | `addSubgroupDialog.getByRole('button', { name: 'Cancel' })` |
| `addSubgroupSaveButton` | `addSubgroupDialog.getByRole('button', { name: 'Save' })` |
| `addSubgroupCloseButton` | `addSubgroupDialog.getByRole('button', { name: 'Close' })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Dialog Structure | 6 | 2463-2468 |
| Parent Context | 3 | 2469-2471 |
| Group Name | 4 | 2472-2475 |
| Dismissal | 4 | 2476-2479 |
| Accessibility | 3 | 2480-2482 |
| Gated Lifecycle | 1 | 2483 |

## Mutation Gates

Synthetic create lifecycle requires:
- `TEST_USER_GROUP_ALLOW_MUTATION=true`
- `TEST_USER_GROUP_ALLOW_DELETE=true`

Currently gated behind `test.skip()` until delete utilities are implemented.

## State After Testing
- No dialog open
- Search empty
- Collapse All applied
- No synthetic subgroup created
- Browser visible and open