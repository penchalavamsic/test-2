# SYU-B: System Users — Edit System User Assignments — Handoff

## Summary
24 tests (LIMAS-SUD-2552 to LIMAS-SUD-2575) covering the Edit System User Assignments dialog: shell, prepopulated assignments, profile assignments, user group assignments, update state, dismissal, and gated lifecycle.

## Key Findings (Live Inspection)

### Dialog Shell
- Dialog heading and description text
- Cancel, Close, and Update buttons
- Profiles and User Groups sections
- Initial focus on the first interactive element

### Prepopulated Assignments
- Existing profile assignments match the selected user's profile data
- Existing user group assignments match the selected user's group data
- Assignments are user-specific — no cross-user contamination
- No duplicate rows in prepopulated lists

### Profile Assignments
- Runtime profile options populated from available data
- Add/remove profile chips via combobox interaction
- Duplicate prevention when adding an already-assigned profile
- Escape key dismisses the profile dropdown

### User Group Assignments
- Runtime user group options populated from available data
- Add/remove user group chips via combobox interaction
- Duplicate prevention when adding an already-assigned group

### Update State
- Update button initially enabled
- Update button becomes enabled after adding a profile
- Update button becomes enabled after removing a profile
- Update button reverts to initial state after dismissal and reopen

### Dismissal
- Cancel button closes dialog without mutation
- Close (X) button closes dialog without mutation
- Escape key closes dialog without mutation
- No mutation occurs before Update is clicked

### Gated Lifecycle
- Mutation lifecycle follows controlled Create-Read-Update pattern; skip conditions verified

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/system-users/system-users-edit-assignments.spec.ts` |
| POM | `tests/pages/system-users.page.ts` |
| Plans | `plans/syu-b/` (24 files: LIMAS-SUD-2552 to LIMAS-SUD-2575) |
| Handoff | `docs/handoff/syu-b-handoff.md` |
| Index | `docs/handoff/generated-test-index.md` (pending) |

## POM: SystemUsersPage

```typescript
// Dialog shell
editAssignmentsDialog, dialogHeading, dialogDescription,
cancelButton, closeButton, updateButton

// Sections
profilesSection, userGroupsSection

// Profile assignments
profileCombobox, profileChipList, profileChip(name)

// User group assignments
userGroupCombobox, userGroupChipList, userGroupChip(name)
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `editAssignmentsDialog` | `page.getByRole('dialog', { name: /edit.*assignments/i })` |
| `dialogHeading` | `dialog.getByRole('heading')` |
| `dialogDescription` | Descriptive text within the dialog |
| `cancelButton` | `dialog.getByRole('button', { name: 'Cancel' })` |
| `closeButton` | `dialog.getByRole('button', { name: 'Close' })` |
| `updateButton` | `dialog.getByRole('button', { name: 'Update' })` |
| `profileCombobox` | `dialog.getByRole('combobox', { name: /profile/i })` |
| `userGroupCombobox` | `dialog.getByRole('combobox', { name: /user group/i })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Dialog Shell | 4 | 2552-2555 |
| Prepopulated Assignments | 4 | 2556-2559 |
| Profile Assignments | 4 | 2560-2563 |
| User Group Assignments | 3 | 2564-2566 |
| Update State | 4 | 2567-2570 |
| Dismissal | 4 | 2571-2574 |
| Gated Lifecycle | 1 | 2575 |

## Test Detail Table

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|-----------------|---------|--------|
| LIMAS-SUD-2552 | Dialog heading and description text | plans/syu-b/LIMAS-SUD-2552.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2553 | Cancel, Close, and Update buttons | plans/syu-b/LIMAS-SUD-2553.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2554 | Profiles and User Groups sections | plans/syu-b/LIMAS-SUD-2554.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2555 | Initial focus on first interactive element | plans/syu-b/LIMAS-SUD-2555.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2556 | Existing profile assignments match user data | plans/syu-b/LIMAS-SUD-2556.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2557 | Existing user group assignments match user data | plans/syu-b/LIMAS-SUD-2557.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2558 | No cross-user assignment contamination | plans/syu-b/LIMAS-SUD-2558.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2559 | No duplicate rows in prepopulated lists | plans/syu-b/LIMAS-SUD-2559.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2560 | Runtime profile options from available data | plans/syu-b/LIMAS-SUD-2560.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2561 | Add and remove profile chips | plans/syu-b/LIMAS-SUD-2561.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2562 | Duplicate prevention for profiles | plans/syu-b/LIMAS-SUD-2562.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2563 | Escape key dismisses profile dropdown | plans/syu-b/LIMAS-SUD-2563.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2564 | Runtime user group options from available data | plans/syu-b/LIMAS-SUD-2564.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2565 | Add and remove user group chips | plans/syu-b/LIMAS-SUD-2565.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2566 | Duplicate prevention for user groups | plans/syu-b/LIMAS-SUD-2566.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2567 | Update button initially enabled | plans/syu-b/LIMAS-SUD-2567.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2568 | Update enabled after adding profile | plans/syu-b/LIMAS-SUD-2568.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2569 | Update enabled after removing profile | plans/syu-b/LIMAS-SUD-2569.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2570 | Update reverts after dismiss and reopen | plans/syu-b/LIMAS-SUD-2570.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2571 | Cancel button closes dialog without mutation | plans/syu-b/LIMAS-SUD-2571.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2572 | Close button closes dialog without mutation | plans/syu-b/LIMAS-SUD-2572.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2573 | Escape key closes dialog without mutation | plans/syu-b/LIMAS-SUD-2573.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2574 | No mutation before Update is clicked | plans/syu-b/LIMAS-SUD-2574.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2575 | Mutation lifecycle — Create-Read-Update skip conditions | plans/syu-b/LIMAS-SUD-2575.md | tests/system-users/system-users-edit-assignments.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |

## Mutation Gates

`TEST_PROFILE_RW` — this batch performs mutation (Update). A profile with RW permissions is required.

## State After Testing
- Edit Assignments dialog closed
- No pending mutation
- No request pending
- Browser visible and open