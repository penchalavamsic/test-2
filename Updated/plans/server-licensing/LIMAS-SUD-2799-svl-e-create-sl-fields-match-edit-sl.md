# Test Plan: LIMAS-SUD-2799 — SVL-E: Create SL Fields Match Edit SL

## Metadata

- **Test ID:** LIMAS-SUD-2799
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Standard License form fields (Product Profile, Profile Role, Number of Licenses, Maintenance Date, Expiration Date) match the Edit Standard License dialog fields, minus the name/role fields which are on the card. Both forms lack Group, checkout, and sync fields.

## Scope

Verify structural consistency between Create and Edit Standard License forms. The editable fields should be the same set, with the only difference being that Edit pre-fills values and Create starts empty.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- At least one Standard License card exists (for Edit comparison)
- Create Standard License form is open

## Test Steps

1. Open the Create Standard License form
2. Enumerate all field labels and types in the Create form
3. Open the Edit Standard License dialog on an existing Standard License card
4. Enumerate all field labels and types in the Edit dialog
5. Assert the editable field set (labels and types) is identical between Create and Edit, excluding name/role which appear on the card but not in the Edit dialog
6. Assert neither form contains a Group field
7. Assert neither form contains checkout-related fields
8. Assert neither form contains a Synchronize checkbox

## Expected Result

Create and Edit Standard License forms share the same editable field set: Product Profile, Profile Role, Number of Licenses, Maintenance Date, Expiration Date. Group, checkout, and sync fields are absent from both.

## Test Data

- Use runtime discovery for: field labels, field types in both forms
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open and at least one existing Standard License card

## Notes

- Name and role on the card are not part of the Edit dialog fields — they are displayed on the card itself
- The structural parallelism between Create and Edit forms should match the FL variant pattern