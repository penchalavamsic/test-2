# LIMAS-SUD-2061: Dialog has role dialog and accessible name

## Objective
Verify that the Add Root Feature dialog behaves correctly for: dialog has role dialog and accessible name.

## Preconditions
- User is authenticated as SUPER_USER_ADMIN_USER
- User is on the Features page (/features)

## Test Steps
1. Navigate to /features
2. Click "Add Root Feature" button to open the dialog
3. Perform the interactions relevant to the test case
4. Assert the expected behavior
5. Cancel/close the dialog (do not save unless lifecycle test)

## Expected Result
- The assertion succeeds as described in the test name
- No console errors related to the dialog

## Notes
- Module: FTR-B (Features — Add Root Feature)
- File: tests/features/features-add-root.spec.ts
- Safe test: uses Cancel to dismiss (no mutations unless gated lifecycle)
