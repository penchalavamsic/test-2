# Test Plan: LIMAS-SUD-2714 — SVL-D: Edit Standard License Focus Return

## Metadata

- **Test ID:** LIMAS-SUD-2714
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** After the Edit Standard License dialog is dismissed (via Cancel, Close, or Escape), keyboard focus returns to the "Edit Standard License" button that opened it.

## Scope

Verify that focus management after dialog dismissal is correct. Focus must return to the trigger button so keyboard users can continue navigating from where they left off.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Edit Standard License dialog has been dismissed

## Test Steps

1. Click the "Edit Standard License" button on a Standard License card
2. Verify the dialog opens
3. Press Escape to close the dialog
4. Assert the active element is the "Edit Standard License" button that was clicked
5. Click the "Edit Standard License" button again to reopen
6. Click Cancel to close the dialog
7. Assert the active element is the "Edit Standard License" button
8. Click the "Edit Standard License" button again to reopen
9. Click the Close button ("Close Edit Standard License")
10. Assert the active element is the "Edit Standard License" button

## Expected Result

Focus returns to the "Edit Standard License" trigger button after dismissal via Escape, Cancel, and Close.

## Test Data

- Use runtime discovery for: button accessible names
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Standard License card with Edit button

## Notes

- If multiple cards exist, focus must return to the specific card's button that was clicked
