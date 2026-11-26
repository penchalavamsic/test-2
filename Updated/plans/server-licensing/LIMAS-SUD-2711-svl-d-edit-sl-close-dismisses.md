# Test Plan: LIMAS-SUD-2711 — SVL-D: Edit Standard License Close Button Dismisses Dialog

## Metadata

- **Test ID:** LIMAS-SUD-2711
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking the Close button labeled "Close Edit Standard License" dismisses the Edit Standard License dialog without persisting changes.

## Scope

Verify that the Close button (the X or dedicated close control) in the Edit Standard License dialog dismisses the dialog. Confirm the dialog region is removed from the DOM or hidden after clicking Close.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Edit Standard License dialog is open

## Test Steps

1. Open the Edit Standard License dialog on a Standard License card
2. Modify a field (e.g., change the Number of Standard Licenses)
3. Locate the Close button with accessible name "Close Edit Standard License"
4. Click the Close button
5. Assert the dialog region is removed or no longer visible
6. Assert the card values are unchanged from their original state

## Expected Result

Clicking "Close Edit Standard License" dismisses the dialog. The card continues to show original values.

## Test Data

- Use runtime discovery for: button accessible name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Standard License card with Edit dialog open

## Notes

- The Close button is distinct from Cancel; both should dismiss without persisting
