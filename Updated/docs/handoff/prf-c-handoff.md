# PRF-C: Profiles — Manage Profile Roles — Handoff

## Summary
42 tests (LIMAS-SUD-2248 to LIMAS-SUD-2289) covering the Roles tab inside the Manage Profile dialog, including shell, existing role rows, Add Role dialog, validation, dismissal, action inspection, accessibility, gated synthetic lifecycle, and end-state restoration.

## Key Findings (Live Inspection)

### Roles Tab Shell
- Heading: "Manage Roles" (h4)
- **Add Role** button present
- Role list uses div.border.rounded-lg cards (not `<table>`)
- 6 roles on "Authoring Suite 2" profile during inspection
- Rows are in a `.space-y-2` container

### Role Row Structure (per row)
```
┌─────────────────────────────────────────────┐
│ Role Name                    [Edit] [Delete] │
│ Value: NNN                                  │
└─────────────────────────────────────────────┘
```
- **Name**: first div child of the row's left section
- **Value**: second div child, format "Value: NNN"
- **Edit**: button containing `svg.lucide-square-pen`
- **Delete**: button containing `svg.lucide-trash2` with `text-destructive` class
- Both Edit and Delete buttons are **icon-only with NO aria-label** — accessibility gap

### Add Role Dialog
- `role="dialog"` with accessible name "Add Role"
- Heading: "Add Role" (h2)
- Description: "Add a new role to this profile"
- **Role Name**: textbox, placeholder "Enter role name", required indicator `*`
- **Value (Priority)**: spinbutton, required indicator `*`
- **Cancel**, **Save**, **Close** buttons
- Save is initially disabled, enables when both fields are non-empty
- Initial focus lands on the Role Name textbox

### Validation
- Save is disabled when either field is empty
- Save enables when both Role Name and Value are filled

### Dismissal
- Cancel, Close, and Escape all close the Add Role dialog
- Reopening resets fields to empty

### Accessibility Gaps
1. **Edit buttons**: no `aria-label` — identified only by SVG class `lucide-square-pen`
2. **Delete buttons**: no `aria-label` — identified only by SVG class `lucide-trash2`
3. Tests document these as known gaps (LIMAS-SUD-2258)

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/profiles/profiles-manage-roles.spec.ts` |
| POM | `tests/pages/profiles.page.ts` (+48 loc: role row accessors, add role dialog locators, helper methods) |
| Plans | `plans/profiles/` (42 files: LIMAS-SUD-2248 to LIMAS-SUD-2289) |
| Handoff | `docs/handoff/prf-c-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (updated) |
| Index | `docs/handoff/generated-test-index.md` (updated) |

## POM Additions: ProfilesPage

```typescript
// Role list
manageRolesEmpty
manageRolesRowName(row), manageRolesRowValue(row)
manageRolesRowEdit(row), manageRolesRowDelete(row)

// Add Role dialog
addRoleDialog, addRoleHeading, addRoleDescription
addRoleNameInput, addRoleValueInput
addRoleCancelButton, addRoleSaveButton, addRoleCloseButton

// Helpers
getManageRoleRowByName(name), getManageRoleCount(), deleteProfileById(id)
```

## Locator Strategy for Icon-Only Edit/Delete Buttons

Since the Edit and Delete buttons lack accessible names:
- **Edit**: `row.locator('button:has(svg.lucide-square-pen)')`
- **Delete**: `row.locator('button:has(svg.lucide-trash2)')`

These are always scoped to a specific runtime role row first, never global.

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Roles Tab Shell | 5 | 2248-2252 |
| Existing Role Rows | 8 | 2253-2260 |
| Add Role Dialog | 6 | 2261-2266 |
| Role Validation | 12 | 2267-2278 |
| Dismissal | 5 | 2279-2283 |
| Role Action Inspection | 2 | 2284-2285 |
| Accessibility | 2 | 2286-2287 |
| Synthetic Lifecycle | 1 | 2288 |
| End-State Restoration | 1 | 2289 |

## Mutation Gates

Add/Edit/Delete are only permitted when ALL conditions are true:
- `TEST_PROFILE_ALLOW_MUTATION=true`
- `TEST_PROFILE_ALLOW_ROLE_MUTATION=true`
- `TEST_PROFILE_ALLOW_DELETE=true`
- Profile was created by the current automation run
- Role has a unique runtime marker
- Cleanup is registered in finally

Synthetic lifecycle uses `test.skip()` until Profile creation is implemented.

## State After Testing
- Add/Edit Role form closed
- No existing Role changed
- Synthetic Profile and Role absent (if created)
- Manage dialog closed
- Profiles page open
- Search empty
- Default sorting restored
- No request pending
- Browser visible and open