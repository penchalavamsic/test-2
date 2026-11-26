# Test Plan: LIMAS-SUD-2779 — SVL-E: Create FL Expiration Date

## Metadata

- **Test ID:** LIMAS-SUD-2779
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a textbox labeled "Expiration Date" that is initially empty.

## Scope

Verify that the Expiration Date field is a textbox with the correct label and starts empty. The field accepts a date value for the floating license's expiration.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Expiration Date field within the form
3. Assert the field has role "textbox"
4. Assert the field has accessible name "Expiration Date"
5. Assert the field value is empty

## Expected Result

A textbox with label "Expiration Date" is present and initially empty.

## Test Data

- Use runtime discovery for: field role, accessible name, initial value
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- The field may be a date picker; discover the actual control type at runtime
- Textbox role suggests free-text date input rather than a dedicated date picker widget