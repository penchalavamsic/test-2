# Test Plan: LIMAS-SUD-2750 — SVL-E: Edit FL Sync Checkbox

## Metadata

- **Test ID:** LIMAS-SUD-2750
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains a checkbox labeled "Synchronize Maintenance and Expiration dates" that is unchecked by default.

## Scope

Verify the Synchronize checkbox in the Edit Floating License dialog: it must be a checkbox, have the correct label, and default to the unchecked state.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open

## Test Steps

1. Open the Edit Floating License dialog on a Floating License card
2. Locate the "Synchronize Maintenance and Expiration dates" checkbox
3. Assert it is a checkbox element
4. Assert the checkbox is unchecked (not checked) by default

## Expected Result

The "Synchronize Maintenance and Expiration dates" checkbox is present and unchecked.

## Test Data

- Use runtime discovery for: checkbox label, checked state
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Floating License card with Edit dialog open

## Notes

- Pattern matches the Standard License dialog's Synchronize checkbox; verify label text at runtime