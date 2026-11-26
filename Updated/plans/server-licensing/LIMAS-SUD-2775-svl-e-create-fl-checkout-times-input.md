# Test Plan: LIMAS-SUD-2775 — SVL-E: Create FL Checkout Times Input

## Metadata

- **Test ID:** LIMAS-SUD-2775
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a spinbutton for checkout times with placeholder "e.g. 6", initially empty.

## Scope

Verify that the Checkout Times input is a spinbutton with a placeholder hint "e.g. 6" and starts empty. The field accepts numeric input for checkout time values in hours.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Checkout Times input within the form
3. Assert the field has role "spinbutton"
4. Assert the field has placeholder text "e.g. 6"
5. Assert the field value is empty

## Expected Result

A spinbutton with placeholder "e.g. 6" is present and initially empty.

## Test Data

- Use runtime discovery for: field role, placeholder text, initial value
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- The placeholder "e.g. 6" hints at expected input format (numeric hours)
- This field may be part of a list of checkout times with an Add button