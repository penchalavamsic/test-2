# PRF-B: Profiles — Manage Dialog — Handoff

## Summary
24 tests (LIMAS-SUD-2224 to LIMAS-SUD-2247) covering the Manage profile dialog shell, Overview tab, Roles tab, Features tab, tab switching, dialog dismiss, and reopening behavior.

## Key Findings (Live Inspection)

### Dialog Shell
- Triggered by clicking the **Manage** button on a profile card
- Opens as a `dialog` (role) with the profile name as its accessible name
- Header: h2 heading with profile name + paragraph (shows "No description" when empty)
- **Close** button dismisses the dialog
- Dialog disappears from DOM on close

### Tabs
- Three tabs: **Overview** (default selected), **Roles**, **Features**
- Proper ARIA: `tablist` with `tab` elements, `tabpanel` for content
- `aria-selected="true"` on the active tab, `"false"` on others
- Switching tabs changes the tabpanel content — no page reload

### Overview Tab
- Summary stats: User Licenses, Floating, Assigned (all numeric, non-negative)
- **Profile Details** section with heading (h4)
  - Name: profile display name
  - Description: "-" when empty
  - Total Roles: numeric count

### Roles Tab
- Heading: "Manage Roles" (h4)
- **Add Role** button
- Table with role entries showing:
  - Role name (e.g. "All")
  - Value label (e.g. "Value: 10")
  - Two action buttons per row (likely Edit/Delete SVG icons)

### Features Tab
- Heading: "Manage Features" (h4)
- Combobox with placeholder "Add feature..." for feature selection
- **Create Feature** button
- **Save** button
- Table with associated features:
  - Feature column (e.g. "Krypto", "AGCO ST122 / CAPI / Runtime")
  - Each row has version combobox + access level combobox
  - Remove button (`x`) per feature row
- Console error (React dev warning): `containerClassName` prop on DOM element — non-functional, from `FeatureAccessMatrix` component using DataTable

### Dialog Behavior
- Different profiles open different-named dialogs (name matches the card)
- Close restores the profiles page without mutation
- Reopening works correctly (no stale state)

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/profiles/profiles-manage.spec.ts` |
| POM | `tests/pages/profiles.page.ts` (+23 loc, +2 methods) |
| Plans | `plans/profiles/` (24 files) |
| Handoff | `docs/handoff/prf-b-handoff.md` |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (201 rows) |
| Index | `docs/handoff/generated-test-index.md` |

## POM Additions: ProfilesPage

```typescript
// Manage dialog
manageDialog(profileName), manageDialogHeading, manageDialogDescription
manageDialogTabOverview, manageDialogTabRoles, manageDialogTabFeatures
manageDialogTabpanel, manageDialogCloseButton
manageOverviewLicenses, manageOverviewFloating, manageOverviewAssigned
manageOverviewDetailName, manageOverviewDetailDescription, manageOverviewDetailTotalRoles
manageRolesHeading, manageRolesAddButton, manageRolesTable
manageFeaturesHeading, manageFeaturesAddCombo, manageFeaturesTable
manageFeaturesCreateButton, manageFeaturesSaveButton
openManageDialog(card, expectedProfileName), closeManageDialog()
```

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Opening and Shell | 5 | 2224-2228 |
| Overview Tab Content | 7 | 2229-2235 |
| Tab Switching | 3 | 2236-2238 |
| Roles Tab Content | 3 | 2239-2241 |
| Features Tab Content | 4 | 2242-2245 |
| Dialog Dismiss and Reopen | 2 | 2246-2247 |

## State After Testing
- No dialog open
- Profiles page intact
- Browser on Profiles