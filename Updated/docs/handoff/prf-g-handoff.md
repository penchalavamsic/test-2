# PRF-G: Profiles — Delete Profile — Handoff

## Summary
18 tests (LIMAS-SUD-2373 to LIMAS-SUD-2390) covering the Delete button on profile cards and its confirmation dialog. Delete is the second icon button (`.cardDeleteButton`) on each card (`svg.lucide-trash2`).

## Key Findings (Live Inspection)

### Delete Button
- Second `button` element on each card (`card.locator('button').nth(1)`)
- No `aria-label`, no `title` attribute — identified by position only
- SVG icon (trash icon via lucide-trash2)
- **Enabled on all inspected cards** — no dependency-based disable logic observed (cards with User Licenses, Assigned Features, Roles, etc. all have enabled Delete buttons)

### Confirmation Dialog
- `role="alertdialog"` with accessible name "Are you sure?"
- Heading h2: "Are you sure?"
- Warning text: "This action cannot be undone. This will permanently delete the profile."
- No profile name in the warning text
- **Cancel** button (receives initial focus) and **Delete** button
- Escape dismisses the dialog
- Cancel dismisses without deletion (profile card still present after Cancel)

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/profiles/profiles-delete.spec.ts` |
| POM | `tests/pages/profiles.page.ts` (+7 loc: delete dialog locators) |
| Plans | `plans/prf-g/` (18 files: LIMAS-SUD-2373 to LIMAS-SUD-2390) |
| Handoff | `docs/handoff/prf-g-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (pending) |
| Index | `docs/handoff/generated-test-index.md` (pending) |

## POM Additions: ProfilesPage

```typescript
// Delete confirmation dialog locators
deleteConfirmDialog, deleteConfirmHeading, deleteConfirmWarning,
deleteConfirmCancelButton, deleteConfirmDeleteButton
```

## Locator Details

| Locator | Strategy |
|---------|----------|
| `cardDeleteButton` (existing) | `card.locator('button').nth(1)` |
| `deleteConfirmDialog` | `page.getByRole('alertdialog')` |
| `deleteConfirmHeading` | `deleteConfirmDialog.getByRole('heading', { name: 'Are you sure?' })` |
| `deleteConfirmWarning` | `deleteConfirmDialog.locator('p')` |
| `deleteConfirmCancelButton` | `deleteConfirmDialog.getByRole('button', { name: 'Cancel' })` |
| `deleteConfirmDeleteButton` | `deleteConfirmDialog.getByRole('button', { name: 'Delete' })` |

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Delete Button Structure | 4 | 2373-2376 |
| Confirmation Dialog | 7 | 2377-2383 |
| Search and Sorting Interaction | 2 | 2384-2385 |
| Controlled Failure Plans | 3 | 2386-2388 |
| Accessibility | 1 | 2389 |
| Synthetic Deletion Lifecycle | 1 | 2390 |

## Mutation Gates

Synthetic deletion lifecycle requires ALL:
- `TEST_PROFILE_ALLOW_MUTATION=true`
- `TEST_PROFILE_ALLOW_DELETE=true`
- Profile created by current automation run

Currently gated behind `test.skip()` until Profile creation is implemented.

## State After Testing
- No dialogs open (afterEach cleans up any alertdialogs via Escape)
- No existing Profiles deleted
- No synthetic Profile present
- Search empty, default sorting restored
- Browser visible and open