# Test Plan: LIMAS-SUD-2767 — SVL-E: Create FL Close Button

## Metadata

- **Test ID:** LIMAS-SUD-2767
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a Close button with accessible name "Close Create Floating License".

## Scope

Verify that the Create Floating License form has a Close button with the correct accessible name. The Close button provides a way to dismiss the form without submitting.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Close button within the form region
3. Assert the button's accessible name is "Close Create Floating License"
4. Assert the button is visible and clickable

## Expected Result

A Close button with accessible name "Close Create Floating License" is visible within the form.

## Test Data

- Use runtime discovery for: button accessible name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- The Close button should be distinct from Cancel if both are present
- Accessible name should match the pattern "Close [Form Name]"