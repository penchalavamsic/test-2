# PRF-D: Profiles — Create Profile — Handoff

## Summary
28 tests (LIMAS-SUD-2290 to LIMAS-SUD-2317) covering the Create Profile dialog structure, Profile Name validation, Description field with counter, save-state behavior, dismissal paths, gated synthetic lifecycle, and end-state restoration.

## Key Findings (Live Inspection)

### Dialog Structure
- `role="dialog"` with accessible name "Create Profile"
- Heading: "Create Profile" (h2, `id="radix-:r2o:"`)
- Description: "Create a new profile" (p, `id="radix-:r2p:"`)
- Close button in dialog header

### Profile Name
- **Label**: "Profile Name *" with required indicator
- **Input**: `input#name`, placeholder "Enter profile name"
- Required field — empty name with only Description: Save is still enabled (any non-empty field enables Save)

### Description
- **Label**: "Description" (optional, no asterisk)
- **Input**: `textarea#description`, placeholder "Enter profile description"
- `maxlength="1000"`, `rows="3"`
- **Counter**: `0 / 1000` span (`span.text-sm.text-muted-foreground`), updates live
- Counter resets to `0 / 1000` on clear

### Save State
- Both fields empty: Save **disabled**
- Either field non-empty: Save **enabled**
- Profile Name only: Save enabled
- Description only: Save enabled
- Both valid: Save enabled
- After clearing last filled field: Save returns to disabled

### Dismissal
- Cancel, Close, and Escape all close the dialog
- Reopening resets both fields to empty and counter to `0 / 1000`

### Focus
- Initial focus: Profile Name textbox
- Focus is contained within the dialog

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/profiles/profiles-create.spec.ts` |
| POM | `tests/pages/profiles.page.ts` (+24 loc: create profile dialog locators, deleteProfileByName) |
| Plans | `plans/profiles/` (28 files: LIMAS-SUD-2290 to LIMAS-SUD-2317) |
| Handoff | `docs/handoff/prf-d-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (updated) |
| Index | `docs/handoff/generated-test-index.md` (updated) |

## POM Additions: ProfilesPage

```typescript
// Create Profile dialog
createProfileDialog, createProfileHeading, createProfileDescription
createProfileNameInput, createProfileDescriptionInput
createProfileDescriptionCounter
createProfileCancelButton, createProfileSaveButton, createProfileCloseButton
deleteProfileByName(name)
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `createProfileDialog` | `page.getByRole('dialog', { name: 'Create Profile' })` |
| `createProfileNameInput` | `dialog.getByRole('textbox', { name: /Profile Name/i })` |
| `createProfileDescriptionInput` | `dialog.getByRole('textbox', { name: 'Description' })` |
| `createProfileDescriptionCounter` | `dialog.locator('span.text-sm.text-muted-foreground')` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Dialog Structure | 7 | 2290-2296 |
| Profile Name | 6 | 2297-2302 |
| Description | 5 | 2303-2307 |
| Save-State and Validation | 4 | 2308-2311 |
| Dismissal | 4 | 2312-2315 |
| Synthetic Lifecycle | 1 | 2316 |
| End-State Restoration | 1 | 2317 |

## Mutation Gates

Save is only permitted when ALL conditions are true:
- `TEST_PROFILE_ALLOW_MUTATION=true`
- `TEST_PROFILE_ALLOW_DELETE=true`
- A unique runtime Profile name is generated
- Cleanup is registered in finally

Synthetic lifecycle uses `test.skip()` until mutation flags are set.

## State After Testing
- Create Profile dialog closed
- Synthetic Profile absent (if created)
- Manage dialog closed
- Search empty
- Default sorting restored
- Browser visible and open