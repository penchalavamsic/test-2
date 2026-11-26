# Test Plan: LIMAS-SUD-2798 — SVL-E: Create SL No Sync Checkbox

## Metadata

- **Test ID:** LIMAS-SUD-2798
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Standard License form does not contain a Synchronize checkbox. This checkbox appears only in the Create Floating License and Edit Floating License forms.

## Scope

Verify that the Synchronize checkbox is absent from the Create Standard License form. Synchronization behavior belongs to floating licenses only.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open

## Test Steps

1. Open the Create Standard License form
2. Enumerate all checkboxes within the form
3. Assert no checkbox has accessible name "Synchronize" or related synchronization label
4. Assert the form contains zero checkboxes (or only unrelated checkboxes)

## Expected Result

The Synchronize checkbox is not present in the Create Standard License form.

## Test Data

- Use runtime discovery for: checkbox presence, checkbox labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open

## Notes

- Synchronize checkbox exists in Create Floating License and Edit Floating License forms
- Its absence from Create Standard License is expected — standard licenses are seat-based and do not synchronize across workstations