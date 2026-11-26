# Test Plan: LIMAS-SUD-2753 — SVL-E: Edit FL Apply Labeled

## Metadata

- **Test ID:** LIMAS-SUD-2753
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains an Apply button labeled "Apply Floating License changes".

## Scope

Verify that the Apply button in the Edit Floating License dialog has the correct accessible name. The accessible name should describe the action contextually for assistive technology users.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open

## Test Steps

1. Open the Edit Floating License dialog on a Floating License card
2. Locate the Apply button within the dialog
3. Assert the button's accessible name is "Apply Floating License changes"
4. Assert the button is present and discoverable

## Expected Result

The Apply button has accessible name "Apply Floating License changes".

## Test Data

- Use runtime discovery for: button accessible name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Floating License card with Edit dialog open

## Notes

- The accessible name provides context for assistive technology users beyond any visible text