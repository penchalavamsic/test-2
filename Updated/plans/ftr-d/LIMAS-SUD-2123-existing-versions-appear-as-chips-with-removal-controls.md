# LIMAS-SUD-2123: Existing Versions appear as chips with removal controls

## Objective
Verify Edit Feature dialog: existing versions appear as chips with removal controls.

## Preconditions
- User authenticated as SUPER_USER_ADMIN_USER on /features
- At least one feature row with Edit button visible

## Test Steps
1. Navigate to /features
2. Identify a feature row with Edit button
3. Click Edit to open dialog
4. Perform interaction specific to test
5. Assert expected behavior
6. Cancel/close dialog without Save (unless gated lifecycle)

## Expected Result
- Assertion succeeds
- Dialog opens/closes cleanly

## Notes
- Module: FTR-D (Features — Edit Feature)
- File: tests/features/features-edit.spec.ts
- No Reset button in Edit dialog
- Feature ID disabled; Feature Name editable
- No mutations unless gated lifecycle
