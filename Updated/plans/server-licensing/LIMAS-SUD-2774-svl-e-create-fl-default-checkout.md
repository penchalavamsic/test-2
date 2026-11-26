# Test Plan: LIMAS-SUD-2774 — SVL-E: Create FL Default Checkout

## Metadata

- **Test ID:** LIMAS-SUD-2774
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a spinbutton labeled "Default Checkout (h)" that is initially empty.

## Scope

Verify that the Default Checkout field is a spinbutton with the correct label and unit suffix, and starts empty. The field accepts hours as the unit for default checkout duration.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Default Checkout field within the form
3. Assert the field has role "spinbutton"
4. Assert the field has accessible name "Default Checkout (h)"
5. Assert the field value is empty (no pre-filled number)

## Expected Result

A spinbutton with label "Default Checkout (h)" is present and initially empty.

## Test Data

- Use runtime discovery for: field role, accessible name, initial value
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- The "(h)" suffix in the label indicates hours as the unit