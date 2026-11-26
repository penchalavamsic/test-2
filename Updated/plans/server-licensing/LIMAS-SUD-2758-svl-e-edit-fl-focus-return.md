# Test Plan: LIMAS-SUD-2758 — SVL-E: Edit FL Focus Return

## Metadata

- **Test ID:** LIMAS-SUD-2758
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** After closing the Edit Floating License dialog, focus returns to the "Edit Floating License" button that triggered it.

## Scope

Verify proper focus restoration after dialog dismissal. Focus should return to the trigger button regardless of dismissal method (Escape, Cancel, or Close).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog has been closed

## Test Steps

1. Open the Edit Floating License dialog
2. Press Escape to close
3. Assert the active element is the "Edit Floating License" button
4. Reopen the dialog
5. Click Cancel to close
6. Assert the active element is the "Edit Floating License" button
7. Reopen the dialog
8. Click the Close button ("Close Edit Floating License")
9. Assert the active element is the "Edit Floating License" button

## Expected Result

Focus returns to the "Edit Floating License" button after Escape, Cancel, and Close dismissal.

## Test Data

- Use runtime discovery for: focused element, button accessible name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card with Edit button

## Notes

- Test all three dismissal methods (Escape, Cancel, Close) for focus return
- Focus management is critical for keyboard accessibility