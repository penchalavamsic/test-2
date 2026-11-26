# FTR-C Handoff: Features — Add Child Feature Dialog

## Scope

FTR-C covers the "Add Child Feature" dialog: dialog shell, access levels inheritance (disabled/read-only), parent context awareness, field behaviors distinct from Add Root, save state, dismissal, gated lifecycle, and safe restoration.

## Test Range

| Item | Value |
|------|-------|
| Test IDs | LIMAS-SUD-2092 – LIMAS-SUD-2116 |
| Count | 25 |
| Spec | `tests/features/features-add-child.spec.ts` |
| Page Object | `tests/pages/features.page.ts` (extended with 17 child-specific locators + 4 methods) |
| Plans | `plans/ftr-c/LIMAS-SUD-2092-*.md` through `LIMAS-SUD-2116-*.md` |
| Checklist | Rows appended to `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` |

## Describe Blocks

### 1. Dialog Shell (3 tests)
- LIMAS-SUD-2092: Button opens dialog with correct role and name
- LIMAS-SUD-2093: Heading "Add Child Feature" h2 and description "Add a child feature"
- LIMAS-SUD-2094: Cancel, Save, Close controls present

### 2. Access Levels — Inherited and Disabled (4 tests)
- LIMAS-SUD-2095: Input and Add button are disabled
- LIMAS-SUD-2096: Info text "Access levels are inherited from the root feature and cannot be modified for child features"
- LIMAS-SUD-2097: Inherited chips match parent row access levels (dynamic)
- LIMAS-SUD-2098: Parent with no access levels shows no inherited chips

### 3. Parent Context (2 tests)
- LIMAS-SUD-2099: Opening from different parent updates dialog context
- LIMAS-SUD-2100: Cancel dismisses without modifying hierarchy

### 4. Field Behavior (9 tests)
- LIMAS-SUD-2101: Feature Name* and Feature ID* required markers
- LIMAS-SUD-2102: Feature Name accepts text
- LIMAS-SUD-2103: Feature ID accepts text
- LIMAS-SUD-2104: Description counter 0/1000 and updates
- LIMAS-SUD-2105: Description max 1000 chars
- LIMAS-SUD-2106: Versions input and Add button present
- LIMAS-SUD-2107: Add version creates chip
- LIMAS-SUD-2108: Multiple version chips
- LIMAS-SUD-2109: Empty/whitespace no chip

### 5. Save State (1 test)
- LIMAS-SUD-2110: Save initially enabled (same behavior as Add Root)

### 6. Dismissal (4 tests)
- LIMAS-SUD-2111: Cancel
- LIMAS-SUD-2112: Close button
- LIMAS-SUD-2113: Escape
- LIMAS-SUD-2114: Reopen shows clean form

### 7. Gated Lifecycle (1 test)
- LIMAS-SUD-2115: Create-delete child lifecycle (gated by TEST_FEATURE_ALLOW_MUTATION + TEST_FEATURE_ALLOW_DELETE)

### 8. Safe Restoration (1 test)
- LIMAS-SUD-2116: Page clean after dialog exploration

## Key Differences from Add Root Feature

| Aspect | Add Root | Add Child |
|--------|----------|-----------|
| Access Levels | Editable textbox + Add button | **Disabled** textbox + disabled Add button |
| Access Levels source | User supplies | **Inherited from parent row** — pre-populated chips |
| Info message | None | ℹ️ "Access levels are inherited from the root feature and cannot be modified" |
| Parent context | None (root feature) | Implicit — dialog opened from a specific parent row |
| Context switching | N/A | Reopening from different parent updates inherited levels |

## Live Inspection Findings

- **Dialog role**: `dialog "Add Child Feature"`
- **Heading**: h2 "Add Child Feature", description "Add a child feature"
- **Access Levels section**: 
  - Textbox disabled, Add button disabled
  - Info banner: "ℹ️ Access levels are inherited from the root feature and cannot be modified for child features."
  - Inherited chips shown as read-only `generic` elements (not textbox chips)
  - Parent "K-DCP Authoring" (Standard/Floating/Viewer) → 3 inherited chips
  - Parent "Diagnostic Stack" (no access levels) → 0 inherited chips
- **All other fields**: identical structure to Add Root (Feature Name*, Feature ID*, Description 0/1000, Versions with Add button)
- **Save**: initially enabled (not validity-gated)
- **Background**: main content aria-hidden when dialog is open

## POM Additions

17 new locators + 4 new methods in `tests/pages/features.page.ts`:

**Locators**: `addChildDialog`, `addChildDialogHeading`, `addChildDialogDescription`, `addChildFeatureNameInput`, `addChildFeatureIdInput`, `addChildDescriptionInput`, `addChildDescriptionCounter`, `addChildVersionsInput`, `addChildVersionsAddButton`, `addChildAccessLevelsInput`, `addChildAccessLevelsAddButton`, `addChildAccessLevelsInherited`, `addChildAccessLevelsInfoText`, `addChildCancelButton`, `addChildSaveButton`, `addChildCloseButton`

**Methods**: `openAddChildDialog(row)`, `closeAddChildDialog()`, `addChildVersion(version)`, `getInheritedAccessLevels()`

## Safety

- All tests use Cancel to dismiss (no mutations except gated lifecycle)
- Gated lifecycle: TEST_FEATURE_ALLOW_MUTATION + TEST_FEATURE_ALLOW_DELETE
- Safe restoration test at end ensures page is clean
- No hardcoded parent names, IDs, versions, or access levels

## End State

After FTR-C:
- FTR total: 88 (31 FTR-A + 32 FTR-B + 25 FTR-C)
- Grand total: 2168 (+25 from 2143)
- Last ID: LIMAS-SUD-2116