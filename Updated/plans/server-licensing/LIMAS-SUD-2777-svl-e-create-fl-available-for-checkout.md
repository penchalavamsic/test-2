# Test Plan: LIMAS-SUD-2777 — SVL-E: Create FL Available For Checkout

## Metadata

- **Test ID:** LIMAS-SUD-2777
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a checkbox labeled "Available for checkout".

## Scope

Verify that the Available for checkout checkbox is present in the form with the correct label. This is a boolean control for the floating license's checkout availability state.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Available for checkout control within the form
3. Assert the control has role "checkbox"
4. Assert the checkbox has accessible name "Available for checkout"
5. Assert the checkbox is visible and interactive

## Expected Result

A checkbox with label "Available for checkout" is present and interactive.

## Test Data

- Use runtime discovery for: checkbox role, accessible name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- The initial checked/unchecked state may vary; discover at runtime
- This checkbox likely controls whether the floating license appears as available for checkout immediately after creation