# Test Plan: LIMAS-SUD-2793 — SVL-E: Create SL Number of Licenses

## Metadata

- **Test ID:** LIMAS-SUD-2793
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Standard License form contains a "Number of Licenses" spinbutton that is initially empty.

## Scope

Verify that the Number of Licenses field is a spinbutton control that starts empty, requiring the user to enter a quantity before the form can be submitted.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open
- No fields have been filled

## Test Steps

1. Open the Create Standard License form
2. Locate the "Number of Licenses" field within the form
3. Assert the field is a spinbutton (role="spinbutton")
4. Assert the field is empty — no default value pre-filled

## Expected Result

The Number of Licenses spinbutton is present and empty initially.

## Test Data

- Use runtime discovery for: field role, field value
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open with no fields filled

## Notes

- Spinbutton empty state is consistent with other SVL forms
- The field may accept whole positive integers only; discover constraints at runtime