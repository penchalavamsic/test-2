# FTR-B Handoff: Features — Add Root Feature Dialog

## Scope

FTR-B covers the "Add Root Feature" dialog: its shell, all form fields (Feature Name, Feature ID, Description, Versions, Access Levels), field behaviors (chips, character counter, validation), Save state, dismissal mechanisms, cancellation cleanup, and a gated create-delete lifecycle.

## Test Range

| Item | Value |
|------|-------|
| Test IDs | LIMAS-SUD-2060 – LIMAS-SUD-2091 |
| Count | 32 |
| Spec | `tests/features/features-add-root.spec.ts` |
| Page Object | `tests/pages/features.page.ts` (extended with 15 dialog locators + 6 methods) |
| Plans | `plans/ftr-b/LIMAS-SUD-2060-*.md` through `LIMAS-SUD-2091-*.md` |
| Checklist | Rows appended to `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` |

## Describe Blocks

### 1. Dialog Shell (5 tests)
- LIMAS-SUD-2060: Add Root Feature button opens a dialog
- LIMAS-SUD-2061: Dialog has role dialog and accessible name
- LIMAS-SUD-2062: Dialog has heading "Add Root Feature" as h2
- LIMAS-SUD-2063: Dialog has description "Add a new root feature"
- LIMAS-SUD-2064: Dialog has Cancel, Save, and Close controls

### 2. Feature Name and ID (5 tests)
- LIMAS-SUD-2065: Feature Name input accepts text
- LIMAS-SUD-2066: Feature Name is marked required
- LIMAS-SUD-2067: Feature ID input accepts text
- LIMAS-SUD-2068: Feature ID is marked required
- LIMAS-SUD-2069: Empty Feature Name with ID filled — document Save state

### 3. Description (4 tests)
- LIMAS-SUD-2070: Description field is present and optional
- LIMAS-SUD-2071: Description character counter starts at 0/1000
- LIMAS-SUD-2072: Description counter updates while typing
- LIMAS-SUD-2073: Description maximum length is 1000 characters

### 4. Versions (5 tests)
- LIMAS-SUD-2074: Versions input and Add button are present
- LIMAS-SUD-2075: Add version creates a chip with removal control
- LIMAS-SUD-2076: Add multiple versions creates multiple chips
- LIMAS-SUD-2077: Duplicate version adds only once or is validated
- LIMAS-SUD-2078: Empty and whitespace-only Add does not create a valid chip

### 5. Access Levels (4 tests)
- LIMAS-SUD-2079: Access Levels input and Add button are present
- LIMAS-SUD-2080: Add access level creates a chip with removal control
- LIMAS-SUD-2081: Add multiple access levels
- LIMAS-SUD-2082: Duplicate access level is handled

### 6. Save State (3 tests)
- LIMAS-SUD-2083: Save is initially enabled when dialog opens
- LIMAS-SUD-2084: Save remains enabled after filling required fields
- LIMAS-SUD-2085: Save state with optional fields filled

### 7. Dismissal (4 tests)
- LIMAS-SUD-2086: Cancel dismisses the dialog without creating
- LIMAS-SUD-2087: Close button dismisses the dialog
- LIMAS-SUD-2088: Escape dismisses the dialog
- LIMAS-SUD-2089: Reopening dialog after Cancel shows clean form

### 8. Gated Lifecycle (1 test)
- LIMAS-SUD-2090: Controlled create-delete lifecycle with mutation gates
  - Gated behind `TEST_FEATURE_ALLOW_MUTATION` and `TEST_FEATURE_ALLOW_DELETE`
  - Creates a feature with timestamp marker, verifies it appears in table
  - Cleans up via search and delete when gates enabled

### 9. Safe Restoration (1 test)
- LIMAS-SUD-2091: Features page clean after dialog exploration

## Live Inspection Findings

- **Dialog role**: `dialog "Add Root Feature"` — accessible name set
- **Heading**: `heading "Add Root Feature" [level=2]`
- **Description**: paragraph "Add a new root feature"
- **Fields**:
  - Feature Name * — textbox, placeholder "Enter feature name"
  - Feature ID * — textbox, placeholder "e.g., FEAT-001"
  - Description — textbox, character counter "0 / 1000", placeholder "Enter feature description", max 1000 chars
  - Versions — textbox "e.g., 1.0, 2.0" + Add button, chips with text + X removal icon
  - Access Levels — textbox "e.g., Basic, Premium" + Add button, same chip pattern
- **Controls**: Cancel, Save (initially **enabled** — not validity-gated), Close (X)
- **Save state**: Save is enabled from the moment the dialog opens, before any fields are filled. This is notably different from FLC-E Create where Save starts disabled.
- **Chip pattern**: Version/access level chips display as text with an adjacent img (X button) for removal
- **Background**: main content gets `aria-hidden` when dialog is open

## POM Additions

15 new locators + 6 new methods added to `tests/pages/features.page.ts`:

**Locators**: `addRootDialog`, `addRootDialogHeading`, `addRootDialogDescription`, `addRootFeatureNameInput`, `addRootFeatureIdInput`, `addRootDescriptionInput`, `addRootDescriptionCounter`, `addRootVersionsInput`, `addRootVersionsAddButton`, `addRootAccessLevelsInput`, `addRootAccessLevelsAddButton`, `addRootCancelButton`, `addRootSaveButton`, `addRootCloseButton`

**Methods**: `openAddRootDialog()`, `closeAddRootDialog()`, `addVersion(version)`, `addAccessLevel(level)`, `getVersionChip(version)`

## Safety

- All tests use Cancel to dismiss (no mutations except the gated lifecycle test)
- Gated lifecycle test requires both `TEST_FEATURE_ALLOW_MUTATION` and `TEST_FEATURE_ALLOW_DELETE`
- Safe restoration test at the end ensures page is clean

## End State

After FTR-B:
- FTR total: 63 (31 FTR-A + 32 FTR-B)
- Grand total: 2143 (+32 from 2111)
- Last ID: LIMAS-SUD-2091