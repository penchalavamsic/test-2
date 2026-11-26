# Test Plan: LIMAS-SUD-2796 — SVL-E: Create SL No Group Field

## Metadata

- **Test ID:** LIMAS-SUD-2796
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Standard License form does not contain a Group field. This is a structural difference from Create Floating License, which does include a Group field.

## Scope

Verify that the Group field is absent from the Create Standard License form. Standard licenses are not associated with user groups, unlike floating licenses.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open

## Test Steps

1. Open the Create Standard License form
2. Enumerate all labeled fields and comboboxes within the form
3. Assert no field has accessible name "Group" or role="combobox" with a Group-related label
4. Assert no Group label or group field container is present

## Expected Result

The Group field is not present in the Create Standard License form.

## Test Data

- Use runtime discovery for: field labels, field roles, absence of Group field
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open

## Notes

- This is a key structural difference between Create Standard License and Create Floating License
- Create Floating License contains a Group combobox; Create Standard License does not