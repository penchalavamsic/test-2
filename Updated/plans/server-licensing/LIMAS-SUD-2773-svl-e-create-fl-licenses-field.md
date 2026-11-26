# Test Plan: LIMAS-SUD-2773 — SVL-E: Create FL Licenses Field

## Metadata

- **Test ID:** LIMAS-SUD-2773
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a spinbutton labeled "Licenses" that is initially empty.

## Scope

Verify that the Licenses field is a spinbutton control with the correct label and starts in an empty state. The field allows numeric input for the number of floating licenses.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Licenses field within the form
3. Assert the field has role "spinbutton"
4. Assert the field has accessible name "Licenses"
5. Assert the field value is empty (no pre-filled number)

## Expected Result

A spinbutton with label "Licenses" is present and initially empty.

## Test Data

- Use runtime discovery for: field role, accessible name, initial value
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- Spinbutton indicates a numeric input with increment/decrement controls