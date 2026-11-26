# Test Plan: LIMAS-SUD-2678 — SVL-D: Delete Customer Accessible Name

## Metadata

- **Test ID:** LIMAS-SUD-2678
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The "Delete Customer" button has accessible name matching "Delete Customer" and a button role.

## Scope

Verify accessibility properties of the Delete Customer button: its computed accessible name must be "Delete Customer" and its ARIA role must be "button".

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the "Delete Customer" button element
3. Query its computed accessible name
4. Assert accessible name equals "Delete Customer"
5. Assert the element has role "button"

## Expected Result

The element has accessible name "Delete Customer" and role "button".

## Test Data

- Use runtime discovery for: customer names
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- Accessible name may come from aria-label, text content, or aria-labelledby
