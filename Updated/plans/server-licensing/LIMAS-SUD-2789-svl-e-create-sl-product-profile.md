# Test Plan: LIMAS-SUD-2789 — SVL-E: Create SL Product Profile

## Metadata

- **Test ID:** LIMAS-SUD-2789
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Standard License form contains a Product Profile combobox with placeholder text "Select a product profile". Note: Unlike Create Floating License, there is no Group field in Create Standard License.

## Scope

Verify that the Product Profile field is a combobox and displays the correct placeholder text when no value is selected. Also confirm that the Group field is absent (structural difference from Create FL).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open

## Test Steps

1. Open the Create Standard License form
2. Locate the Product Profile field within the form
3. Assert the field is a combobox
4. Assert the placeholder text is "Select a product profile"
5. Assert no value is pre-selected (placeholder is shown)
6. Assert no Group field is present in the form

## Expected Result

The Product Profile combobox shows placeholder "Select a product profile" with no value pre-selected. No Group field exists.

## Test Data

- Use runtime discovery for: placeholder text, combobox role, field presence/absence
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open

## Notes

- No Group field in Create Standard License — this is a structural difference from Create Floating License (which has Group)
- Placeholder text may be implemented as an empty first option or via the placeholder attribute