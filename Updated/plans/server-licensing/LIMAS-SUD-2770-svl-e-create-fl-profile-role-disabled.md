# Test Plan: LIMAS-SUD-2770 — SVL-E: Create FL Profile Role Disabled

## Metadata

- **Test ID:** LIMAS-SUD-2770
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Profile Role combobox is initially disabled and shows placeholder text "Select a profile role".

## Scope

Verify that the Profile Role combobox is disabled when the form first opens and displays a placeholder indicating the user must first select a Product Profile. This is a dependent dropdown pattern.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open
- No Product Profile has been selected

## Test Steps

1. Open the Create Floating License form
2. Locate the Profile Role field within the form
3. Assert the field is a combobox
4. Assert the combobox is disabled (aria-disabled="true" or disabled attribute)
5. Assert the placeholder text is "Select a profile role"

## Expected Result

The Profile Role combobox is disabled with placeholder "Select a profile role" until a Product Profile is selected.

## Test Data

- Use runtime discovery for: disabled state, placeholder text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open with no Product Profile selected

## Notes

- Dependent dropdown pattern: Profile Role depends on Product Profile selection
- Verify disabled state immediately on form open without interacting with Product Profile