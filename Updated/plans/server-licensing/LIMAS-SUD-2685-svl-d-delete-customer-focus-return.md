# Test Plan: LIMAS-SUD-2685 — SVL-D: Delete Customer Focus Return

## Metadata

- **Test ID:** LIMAS-SUD-2685
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** After dismissing the confirmation dialog (Cancel or Escape), focus returns to the "Delete Customer" button.

## Scope

Verify that keyboard focus is restored to the Delete Customer button after the confirmation dialog is dismissed without deletion. This ensures keyboard users and screen-reader users can continue from the same context.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Delete Customer confirmation dialog was opened and then dismissed

## Test Steps

1. Open the Delete Customer confirmation dialog for a customer with zero licenses
2. Dismiss the dialog (via Cancel button or Escape key)
3. Query the currently focused element
4. Assert the focused element is the "Delete Customer" button

## Expected Result

Focus returns to the "Delete Customer" button on the customer card after dialog dismiss.

## Test Data

- Use runtime discovery for: customer name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard and zero Floating licenses

## Notes

- Test both dismissal paths (Cancel and Escape) or at minimum one path
