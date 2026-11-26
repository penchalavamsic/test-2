# LIMAS-SUD-2095: Access Levels input and Add button are disabled

## Objective
Verify that the Add Child Feature dialog behaves correctly for: access levels input and add button are disabled.

## Preconditions
- User authenticated as SUPER_USER_ADMIN_USER on the Features page (/features)
- At least one parent feature row is visible with Add Child Feature button

## Test Steps
1. Navigate to /features
2. Identify a parent row with Add Child Feature button
3. Click Add Child Feature to open the dialog
4. Perform interaction specific to the test case
5. Assert expected behavior
6. Cancel/close dialog (no save unless gated lifecycle)

## Expected Result
- The assertion succeeds as described in the test name
- Dialog opens/closes cleanly with no console errors

## Notes
- Module: FTR-C (Features — Add Child Feature)
- File: tests/features/features-add-child.spec.ts
- Access Levels are inherited and disabled — separate from Add Root
- No mutations triggered unless gated lifecycle
