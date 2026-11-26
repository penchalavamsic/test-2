# Test Plan: LIMAS-SUD-2776 — SVL-E: Create FL Add Checkout Time Disabled

## Metadata

- **Test ID:** LIMAS-SUD-2776
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Add button for checkout times is disabled until a valid checkout time is entered in the spinbutton.

## Scope

Verify that the Add button for checkout times follows a validation-gated pattern: disabled when the checkout time input is empty, enabled only when a valid value is entered.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open
- Checkout Times spinbutton is empty

## Test Steps

1. Open the Create Floating License form
2. Locate the Checkout Times spinbutton and its associated Add button
3. Assert the spinbutton is empty
4. Assert the Add button is disabled
5. Enter a valid numeric value (e.g., 6) in the spinbutton
6. Assert the Add button becomes enabled

## Expected Result

The Add button is disabled when the checkout time input is empty and enables when a valid value is entered.

## Test Data

- Use runtime discovery for: button state, input value
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- The Add button enables only when the checkout time input has a valid value
- This is the same validation-gated pattern as Apply buttons in edit dialogs