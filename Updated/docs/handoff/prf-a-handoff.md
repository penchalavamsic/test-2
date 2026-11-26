# PRF-A: Profiles — Page Shell, Search, Sorting, and Cards — Handoff

## Summary
32 tests (LIMAS-SUD-2192 to LIMAS-SUD-2223) covering the Profiles page shell, search, sorting, card structure, accessibility, and safe restoration.

## Key Findings (Live Inspection)

### Page Shell
- URL: `/profiles`
- Heading: h1 "Profiles"
- **Create Profile** button present (not clicked)
- 72 profile cards loaded

### Search
- Placeholder: "Search"
- Client-side text filtering
- Case-insensitive
- Clear restores all cards
- No-match shows zero cards

### Sorting
- **Sort field**: combobox with default "Name"
- **Sort direction**: combobox with default "Ascending"
- Options observed: Name (in field), Ascending/Descending (in direction)

### Card Structure (per card)
```
┌─────────────────────────────────────┐
│ h3 "Profile Name"    [Edit][Delete] │
│                                     │
│ "N" User Licenses                   │
│ "N" Floating                        │
│ "N" Assigned                        │
│                                     │
│ N Roles  [badge1] [badge2] [+N]    │
│                                     │
│ [Manage]                            │
└─────────────────────────────────────┘
```
- Edit/Delete: SVG icon buttons (no text content), adjacent to h3 heading
- Role badges: text labels like "Intern", "2019-R2", "9.99.999", "ALL", "Default", etc.
- Overflow: `+N` badge when role count exceeds visible badge slots (typically 2-3 visible)
- Manage: button with accessible name "Manage"
- Counts are always numeric, non-negative

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/profiles/profiles-search-sorting-cards.spec.ts` |
| POM | `tests/pages/profiles.page.ts` (new) |
| Plans | `plans/profiles/` (32 files) |
| Handoff | `docs/handoff/prf-a-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (177 rows) |
| Index | `docs/handoff/generated-test-index.md` |

## POM: ProfilesPage

```typescript
class ProfilesPage {
  heading, createProfileButton
  searchInput, sortFieldCombo, sortDirectionCombo
  cardGrid, profileCards
  cardHeading(), cardEditButton(), cardDeleteButton()
  cardUserLicensesValue(), cardFloatingValue(), cardAssignedValue()
  cardRolesCount(), cardRoleBadges(), cardRoleOverflowBadge()
  cardManageButton()
  navigate(), getCardCount(), getCardByName(), getFirstProfileName()
  search(), clearSearch(), getSortField(), getSortDirection()
  getRoleBadgeTexts(), getRoleCount()
}
```

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Page Shell | 7 | 2192-2198 |
| Search | 7 | 2199-2205 |
| Sorting | 4 | 2206-2209 |
| Card Structure | 9 | 2210-2218 |
| Accessibility | 4 | 2219-2222 |
| Safe Restoration | 1 | 2223 |

## State After Testing
- Profiles page open
- Search empty
- Default sorting restored (Name, Ascending)
- No dialog open
- Browser on Profiles