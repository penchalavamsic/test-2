# FTR-F: Feature Update Management — Handoff

## Summary
27 tests (LIMAS-SUD-2165 to LIMAS-SUD-2191) covering the Feature Update Management modal opened by clicking a Feature Version.

## Key Findings (Live Inspection)

### Modal Trigger
- Clicking any version chip in the Versions column opens the modal
- Versions have `cursor=pointer` styling

### Modal Dialog
- **Role**: `dialog`, accessible name: "Feature Update Management"
- **Heading**: h2 "Feature Update Management"
- **Subtitle**: "Upload update file for {featureId} - {version}"
- Example: "Upload update file for com.in2soft.otxSuite.extensions - 2.7.999"

### File Upload Control
- Label: "Upload Update File *" (asterisk suggests visual emphasis, not HTML `required`)
- Native `input[type="file"]` is visible/rendered (not hidden) — styled as text input
- No `accept` attribute (no extension restriction in HTML)
- No `required` attribute on `<input>`
- Upload icon button adjacent to file input (SVG icon, no text, no aria-label)
- Initial focus: upload button/label area

### Comments
- Label: "Update Comments"
- Textarea with placeholder: "Enter update comments or release notes..."
- Not required (no HTML `required` attribute)
- Optional field

### Controls
- Cancel, Save, Close
- Save is **initially enabled** (not gated on file selection)
- Dialog dismisses on Close, Cancel, Escape

### State Reset
- Reopening the modal after any dismissal clears file selection and comments
- Clean slate every time

### Upload Contract (not exercised)
- No `accept` attribute → extensions unknown from HTML alone
- No `max`/`maxlength` on comments
- File input has no explicit `name` attribute
- Upload gate flags: `TEST_FEATURE_ALLOW_UPDATE_UPLOAD`, `TEST_FEATURE_UPDATE_FIXTURE_PATH`, `TEST_FEATURE_UPDATE_EXPECTED_EXTENSION`, `TEST_FEATURE_UPDATE_MAX_SIZE_BYTES`

## Artifacts

| File | Path |
|------|------|
| Spec | `tests/features/features-update-management.spec.ts` |
| POM (extended) | `tests/pages/features.page.ts` (+9 locators, +1 method) |
| Plans | `plans/ftr-f/` (27 files) |
| Checklist | `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` (145 rows) |
| Index | `docs/handoff/generated-test-index.md` |

## POM Additions

```typescript
// FTR-F: Feature Update Management dialog
readonly updateDialog: Locator;            // dialog "Feature Update Management"
readonly updateDialogHeading: Locator;     // h2 "Feature Update Management"
readonly updateDialogSubtitle: Locator;    // p with feature/version context
readonly updateFileUploadLabel: Locator;   // "Upload Update File *"
readonly updateFileInput: Locator;         // input[type="file"]
readonly updateCommentsTextarea: Locator;  // textarea "Update Comments"
readonly updateCancelButton: Locator;      // button "Cancel"
readonly updateSaveButton: Locator;        // button "Save"
readonly updateCloseButton: Locator;       // button "Close"

// New method
getFirstVersion(): Locator | null          // First clickable version chip
```

## Test Structure

| Group | Tests | IDs |
|-------|-------|-----|
| Modal Shell | 5 | 2165-2169 |
| File Upload Control | 7 | 2170-2176 |
| Comments | 5 | 2177-2181 |
| Dismissal | 5 | 2182-2186 |
| Accessibility | 3 | 2187-2189 |
| Gated Lifecycle | 1 | 2190 |
| Safe Restoration | 1 | 2191 |

## State After Testing
- Update modal closed
- No upload submitted
- No existing features changed
- Search empty
- Hierarchy restored
- Browser open on Features