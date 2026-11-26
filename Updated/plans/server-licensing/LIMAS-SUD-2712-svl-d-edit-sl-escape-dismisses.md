# Test Plan: LIMAS-SUD-2712 — SVL-D: Edit Standard License Escape Key Dismisses Dialog

## Metadata

- **Test ID:** LIMAS-SUD-2712
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Pressing the Escape key while the Edit Standard License dialog is open closes the dialog safely without persisting changes.

## Scope

Verify that the Escape key is a functional dismissal mechanism for the Edit Standard License dialog, consistent with standard dialog UX patterns. The dialog closes and no modifications are applied.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Edit Standard License dialog is open with focus inside it

## Test Steps

1. Open the Edit Standard License dialog on a Standard License card
2. Modify a field (e.g., change the Expiration Date to a different date)
3. Press the Escape key
4. Assert the dialog is closed
5. Assert the card's Expiration value matches the original value (the modification was not persisted)

## Expected Result

Pressing Escape closes the Edit Standard License dialog. Card values remain unchanged.

## Test Data

- Use runtime discovery for: original card values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Standard License card with Edit dialog open

## Notes

- Escape should behave identically to Cancel and Close — dismiss without persisting
