# FTR-D Handoff: Features — Edit Feature Dialog

## Scope

FTR-D covers the Edit Feature dialog: shell, prepopulated values, root vs child differences, field editability, save state, dismissal, validation, gated update lifecycle, and safe restoration.

## Test Range

| Item | Value |
|------|-------|
| Test IDs | LIMAS-SUD-2117 – LIMAS-SUD-2143 |
| Count | 27 |
| Spec | `tests/features/features-edit.spec.ts` |
| Page Object | `tests/pages/features.page.ts` (+15 locators + 3 methods) |
| Plans | `plans/ftr-d/LIMAS-SUD-2117-*.md` through `LIMAS-SUD-2143-*.md` |
| Checklist | Rows appended to `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` |

## Describe Blocks

### 1. Dialog Shell (3 tests)
- LIMAS-SUD-2117: Edit opens dialog role="dialog" name="Edit"
- LIMAS-SUD-2118: Heading "Edit" h2, description "Edit feature details"
- LIMAS-SUD-2119: Cancel, Save, Close controls; **no Reset button**

### 2. Prepopulation (5 tests)
- LIMAS-SUD-2120: Feature Name editable, prepopulated from row
- LIMAS-SUD-2121: Feature ID **disabled**, prepopulated from row
- LIMAS-SUD-2122: Description with character counter
- LIMAS-SUD-2123: Version chips with removal controls
- LIMAS-SUD-2124: Access Level chips for root features

### 3. Root vs Child (3 tests)
- LIMAS-SUD-2125: Root Access Levels enabled
- LIMAS-SUD-2126: Child displays inherited access levels
- LIMAS-SUD-2127: No inheritance info banner in Edit (unlike Add Child)

### 4. Field Edits (5 tests)
- LIMAS-SUD-2128: Feature Name change
- LIMAS-SUD-2129: Description counter update
- LIMAS-SUD-2130: Description max 1000
- LIMAS-SUD-2131: Add version chip
- LIMAS-SUD-2132: Add access level chip (root)

### 5. Save State (1 test)
- LIMAS-SUD-2133: Save initially enabled

### 6. Dismissal (4 tests)
- LIMAS-SUD-2134: Cancel reverts to persisted values
- LIMAS-SUD-2135: Close dismisses
- LIMAS-SUD-2136: Escape dismisses
- LIMAS-SUD-2137: Reopen shows original persisted values (not cached edits)

### 7. Validation (4 tests)
- LIMAS-SUD-2138: Empty Feature Name
- LIMAS-SUD-2139: Whitespace Feature Name
- LIMAS-SUD-2140: Duplicate version
- LIMAS-SUD-2141: Duplicate access level (root)

### 8. Gated Lifecycle (1 test)
- LIMAS-SUD-2142: Create → Edit → Update → Verify → Delete (gated)

### 9. Safe Restoration (1 test)
- LIMAS-SUD-2143: Page clean after exploration

## Live Inspection Findings

| Field | Root Feature (K-DCP Authoring) | Child Feature (K-DCP Communicator Floating) |
|-------|------|-------|
| Feature Name | Editable, prepopulated | Editable, prepopulated |
| Feature ID | **Disabled**, prepopulated | **Disabled**, prepopulated |
| Description | Empty, counter 0/1000 | Empty, counter 0/1000 |
| Versions | Editable, chips with X | Editable, chips with X |
| Access Levels | **Enabled** textbox + Add button, chips with X | **Enabled** textbox + Add button, chips with X |
| Inheritance banner | None | **None** (unlike Add Child) |
| Reset button | **Absent** | **Absent** |
| Save | Initially enabled | Initially enabled |

### Key Differences from Create/Add Child

| Aspect | Add Root | Add Child | Edit |
|--------|----------|-----------|------|
| Feature ID | Editable | Editable | **Disabled** |
| Access Levels | Editable | **Disabled + inherited** | **Enabled** (both root and child) |
| Reset button | No | No | **No** |
| Inheritance info | No | Yes (ℹ️) | **No** |
| Description | Empty | Empty | Empty (not persisted in table display) |
| Save state | Initially enabled | Initially enabled | Initially enabled |

## POM Additions

15 locators + 3 methods in `tests/pages/features.page.ts`:

**Locators**: `editDialog`, `editDialogHeading`, `editDialogDescription`, `editFeatureNameInput`, `editFeatureIdInput`, `editDescriptionInput`, `editDescriptionCounter`, `editVersionsInput`, `editVersionsAddButton`, `editAccessLevelsInput`, `editAccessLevelsAddButton`, `editCancelButton`, `editSaveButton`, `editCloseButton`

**Methods**: `openEditDialog(row)`, `closeEditDialog()`, `getEditChipValues(section)`

## Safety

- All tests use Cancel (no mutations except gated lifecycle)
- Gated lifecycle: TEST_FEATURE_ALLOW_MUTATION + TEST_FEATURE_ALLOW_DELETE
- No hardcoded feature names/IDs

## End State

After FTR-D:
- FTR total: 115 (31+32+25+27)
- Grand total: 2195 (+27 from 2168)
- Last ID: LIMAS-SUD-2143