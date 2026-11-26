# Test Plan: LIMAS-SUD-2756 — SVL-E: Edit FL Close Dismisses

## Metadata

- **Test ID:** LIMAS-SUD-2756
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking the Close button in the Edit Floating License dialog dismisses the dialog without persisting changes.

## Scope

Verify that the Close button (the X or dedicated close control labeled "Close Edit Floating License") in the Edit Floating License dialog dismisses the dialog. Confirm the dialog region is removed from the DOM or hidden after clicking Close, and card values remain unchanged.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open

## Test Steps

1. Open the Edit Floating License dialog on a Floating License card
2. Modify a field (e.g., change the Floating Licenses value)
3. Locate the Close button with accessible name "Close Edit Floating License"
4. Click the Close button
5. Assert the dialog region is removed or no longer visible
6. Assert the card values are unchanged from their original state

## Expected Result

Clicking "Close Edit Floating License" dismisses the dialog. The card continues to show original values.

## Test Data

- Use runtime discovery for: button accessible name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Floating License card with Edit dialog open

## Notes

- The Close button is distinct from Cancel; both should dismiss without persisting