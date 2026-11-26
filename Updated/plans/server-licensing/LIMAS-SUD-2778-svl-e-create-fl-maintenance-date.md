# Test Plan: LIMAS-SUD-2778 — SVL-E: Create FL Maintenance Date

## Metadata

- **Test ID:** LIMAS-SUD-2778
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a textbox labeled "Maintenance Date" that is initially empty.

## Scope

Verify that the Maintenance Date field is a textbox with the correct label and starts empty. The field accepts a date value for the floating license's maintenance expiration.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Maintenance Date field within the form
3. Assert the field has role "textbox"
4. Assert the field has accessible name "Maintenance Date"
5. Assert the field value is empty

## Expected Result

A textbox with label "Maintenance Date" is present and initially empty.

## Test Data

- Use runtime discovery for: field role, accessible name, initial value
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- The field may be a date picker; discover the actual control type at runtime
- Textbox role suggests free-text date input rather than a dedicated date picker widget