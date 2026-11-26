# Test Plan: LIMAS-SUD-2780 — SVL-E: Create FL Apply Disabled

## Metadata

- **Test ID:** LIMAS-SUD-2780
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Apply button in the Create Floating License form is disabled initially when the form opens.

## Scope

Verify that the Apply button is in a disabled state immediately when the Create Floating License form opens, before any fields are filled. This prevents submission of an incomplete form.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open
- No fields have been filled

## Test Steps

1. Open the Create Floating License form
2. Do not fill any fields
3. Locate the Apply button
4. Assert the Apply button is disabled (aria-disabled="true" or disabled attribute)

## Expected Result

The Apply button is disabled when the form first opens with all required fields empty.

## Test Data

- Use runtime discovery for: button state attribute
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open with no fields filled

## Notes

- Apply should only become enabled once all required fields are filled with valid values
- This is the same validation-gated pattern as other SVL Apply buttons