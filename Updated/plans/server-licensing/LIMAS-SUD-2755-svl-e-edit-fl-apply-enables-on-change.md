# Test Plan: LIMAS-SUD-2755 — SVL-E: Edit FL Apply Enables On Change

## Metadata

- **Test ID:** LIMAS-SUD-2755
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Apply button becomes enabled when any field in the Edit Floating License dialog is changed from its initial pre-filled value.

## Scope

Verify that modifying any editable field in the Edit Floating License dialog transitions the Apply button from disabled to enabled. The button should enable on the first change and remain enabled for subsequent changes.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open with Apply disabled
- At least one field has been modified from its initial value

## Test Steps

1. Open the Edit Floating License dialog on a Floating License card
2. Confirm Apply is initially disabled
3. Change the Floating Licenses spinbutton value
4. Assert Apply is now enabled
5. Close and reopen the dialog
6. Change the Maintenance Date value
7. Assert Apply is now enabled
8. Close and reopen the dialog
9. Change the Expiration Date value
10. Assert Apply is now enabled

## Expected Result

Changing any single field enables the Apply button. The button remains enabled for multi-field changes.

## Test Data

- Use runtime discovery for: field values, button state
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card with editable fields

## Notes

- Reopen the dialog between each field test to reset to disabled state
- Each field change should independently enable Apply