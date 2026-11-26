# UGR-B: Add Group — Handoff

## Summary
25 tests (LIMAS-SUD-2438 to LIMAS-SUD-2462) covering the Add Group dialog structure, field behavior, validation, dismissal, accessibility, and a gated synthetic lifecycle.

## Key Findings (Live Inspection)

### Dialog Structure
- `role="dialog"` with accessible name "Add Group"
- Heading h2: "Add Group"
- Description paragraph: "Add a new group"
- Group Name: `input#name` type="text", no `maxlength`, not HTML `required`, placeholder "Enter group name"
- Visual required indicator: asterisk `*` on "Group Name *" text (no `<label for>` element — rendered as plain text node)
- Comment: `textarea#comment`, `rows=3`, no `maxlength`, placeholder "Enter group comment (optional)"
- Buttons: **Cancel**, **Save**, **Close**
- Initial focus: Group Name input

### Save State (Critical Finding)
- **Save is always enabled** — no client-side gating, even with empty name
- Save stays enabled when: dialog opens (empty), name filled, name cleared, whitespace-only name, comment only
- No dirty-state tracking; server-side validation only

### Dismissal
- Cancel, Close, Escape all dismiss without creating anything
- Reopening resets all fields to empty

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/user-groups/user-groups-add.spec.ts` |
| POM | `tests/pages/user-groups.page.ts` (+17 loc: dialog locators + open/close/dismiss helpers) |
| Plans | `plans/ugr-b/` (25 files: LIMAS-SUD-2438 to LIMAS-SUD-2462) |
| Handoff | `docs/handoff/ugr-b-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (pending) |
| Index | `docs/handoff/generated-test-index.md` (pending) |

## POM Additions: UserGroupsPage

```typescript
// Add Group dialog locators
addGroupDialog, addGroupHeading, addGroupDescription,
addGroupNameInput, addGroupCommentInput, addGroupCancelButton,
addGroupSaveButton, addGroupCloseButton

// Methods
openAddGroupDialog(), closeAddGroupDialog(), dismissAddGroupDialog()
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `addGroupDialog` | `page.getByRole('dialog', { name: 'Add Group' })` |
| `addGroupHeading` | `addGroupDialog.getByRole('heading', { name: 'Add Group', level: 2 })` |
| `addGroupNameInput` | `addGroupDialog.getByRole('textbox', { name: /Group Name/i })` |
| `addGroupCommentInput` | `addGroupDialog.getByRole('textbox', { name: 'Comment' })` |
| `addGroupCancelButton` | `addGroupDialog.getByRole('button', { name: 'Cancel' })` |
| `addGroupSaveButton` | `addGroupDialog.getByRole('button', { name: 'Save' })` |
| `addGroupCloseButton` | `addGroupDialog.getByRole('button', { name: 'Close' })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Dialog Structure | 7 | 2438-2444 |
| Group Name | 7 | 2445-2451 |
| Comment Field | 3 | 2452-2454 |
| Dismissal | 4 | 2455-2458 |
| Accessibility | 3 | 2459-2461 |
| Gated Lifecycle | 1 | 2462 |

## Mutation Gates

Synthetic create lifecycle requires:
- `TEST_USER_GROUP_ALLOW_MUTATION=true`
- `TEST_USER_GROUP_ALLOW_DELETE=true`

Currently gated behind `test.skip()` until delete utilities are implemented.

## State After Testing
- No dialog open (afterEach dismisses via Escape if needed)
- Search empty
- Collapse All applied
- No synthetic Group created
- Browser visible and open