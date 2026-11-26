# Test Plan: LIMAS-SUD-2743 — SVL-E: Edit FL Close Button

## Metadata

- **Test ID:** LIMAS-SUD-2743
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains a close button with accessible name "Close Edit Floating License".

## Scope

Verify that the dialog has a visible Close button with the correct accessible name. The button must be keyboard-operable and visually discoverable.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open

## Test Steps

1. Open the Edit Floating License dialog on a Floating License card
2. Assert a Close button is visible within the dialog
3. Assert the button's accessible name is "Close Edit Floating License"
4. Assert the button is not disabled

## Expected Result

A visible Close button with accessible name "Close Edit Floating License" is present in the dialog.

## Test Data

- Use runtime discovery for: button accessible name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Floating License card with Edit dialog open

## Notes

- The Close button may be an X icon button; verify accessible name at runtime