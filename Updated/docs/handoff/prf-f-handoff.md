# PRF-F: Profiles — Edit Profile — Handoff

## Summary
27 tests (LIMAS-SUD-2346 to LIMAS-SUD-2372) covering the Edit Profile dialog, accessed via the Edit icon button on profile cards (`.cardEditButton` — first button on each card, `svg.lucide-square-pen`).

## Key Findings (Live Inspection)

### Dialog Structure (Profile: AGCO ST122 / CAPI / Runtime)
- `role="dialog"` with accessible name "Edit"
- Heading h2: **"Edit"**
- Supporting `p`: **"Edit profile details"**
- Profile Name: `input#name` type="text", label "Profile Name *" (required asterisk), placeholder "Enter profile name"
- Description: `textarea#description`, `maxlength=1000`, `rows=3`, placeholder "Enter profile description"
- Counter: shows "N / 1000" format
- **Cancel**, **Save**, **Close** buttons
- Initial focus: `input#name`

### Save State (Critical Finding)
- Save is **always enabled** — no client-side disable logic
- Save stays enabled when: form loads, Profile Name changed, Description changed, Profile Name cleared, all changes reverted
- Required indicator (*) on Profile Name is a visual hint but blocked by server-side validation — the client does not enforce it
- No dirty-state tracking on the client

### Reopening / Dismissal
- Cancel/Close/Escape all dismiss without saving and discard unsaved changes
- Reopening restores the original persisted values (fresh from the server)

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/profiles/profiles-edit.spec.ts` |
| POM | `tests/pages/profiles.page.ts` (+19 loc: edit dialog locators, openEditDialog/closeEditDialog) |
| Plans | `plans/profiles/` (27 files: LIMAS-SUD-2346 to LIMAS-SUD-2372) |
| Handoff | `docs/handoff/prf-f-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (updated) |
| Index | `docs/handoff/generated-test-index.md` (updated) |

## POM Additions: ProfilesPage

```typescript
// Edit dialog locators
editDialog, editHeading, editDescription, editNameInput,
editDescriptionInput, editDescriptionCounter, editCancelButton,
editSaveButton, editCloseButton

// Methods
openEditDialog(card), closeEditDialog()
```

The Edit button is the first icon button on each card: `card.locator('button').first()` (already mapped as `cardEditButton`).

## Locator Details

| Locator | Strategy |
|---------|----------|
| `editDialog` | `page.getByRole('dialog', { name: 'Edit' })` |
| `editHeading` | `editDialog.getByRole('heading', { name: 'Edit', level: 2 })` |
| `editNameInput` | `editDialog.getByRole('textbox', { name: /Profile Name/i })` |
| `editDescriptionInput` | `editDialog.getByRole('textbox', { name: 'Description' })` |
| `editDescriptionCounter` | `text=/\\d+\\s*\\/\\s*1000/` |
| `editCancelButton` | `editDialog.getByRole('button', { name: 'Cancel' })` |
| `editSaveButton` | `editDialog.getByRole('button', { name: 'Save' })` |
| `editCloseButton` | `editDialog.getByRole('button', { name: 'Close' })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Dialog Structure | 7 | 2346-2352 |
| Prepopulated Values | 3 | 2353-2355 |
| Save State | 5 | 2356-2360 |
| Description Field | 4 | 2361-2364 |
| Dismissal | 4 | 2365-2368 |
| Accessibility | 2 | 2369-2370 |
| Synthetic Lifecycle | 1 | 2371 |
| End-State Restoration | 1 | 2372 |

## Mutation Gates

Synthetic update lifecycle requires ALL:
- `TEST_PROFILE_ALLOW_MUTATION=true`
- `TEST_PROFILE_ALLOW_DELETE=true`
- Profile created by current automation run

Currently gated behind `test.skip()` until Profile creation is implemented.

## State After Testing
- Edit dialog closed via Close button
- No existing Profile changed
- No synthetic Profile present
- Search empty, default sorting restored
- Browser visible and open