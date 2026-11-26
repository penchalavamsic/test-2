# Test Plan: LIMAS-SUD-2769 — SVL-E: Create FL Product Profile

## Metadata

- **Test ID:** LIMAS-SUD-2769
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains a Product Profile combobox with placeholder text "Select a product profile".

## Scope

Verify that the Product Profile field is a combobox and displays the correct placeholder text when no value is selected. The placeholder guides the user to select an option.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the Product Profile field within the form
3. Assert the field is a combobox
4. Assert the placeholder text is "Select a product profile"
5. Assert no value is pre-selected (placeholder is shown)

## Expected Result

The Product Profile combobox shows placeholder "Select a product profile" with no value pre-selected.

## Test Data

- Use runtime discovery for: placeholder text, combobox role
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- Placeholder text may be implemented as an empty first option or via the placeholder attribute