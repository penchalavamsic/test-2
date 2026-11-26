# Test Plan: LIMAS-SUD-2745 — SVL-E: Edit FL Maintenance Date

## Metadata

- **Test ID:** LIMAS-SUD-2745
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains a textbox labeled "Maintenance Date" prefilled with the card's maintenance date value (e.g., "2024-04-28").

## Scope

Verify the Maintenance Date field in the Edit Floating License dialog: it must be a textbox, have the correct label, and be prefilled with the date displayed on the card.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open
- Card's Maintenance date value has been read before opening

## Test Steps

1. Read the Maintenance date from a Floating License card
2. Open the Edit Floating License dialog on that card
3. Locate the "Maintenance Date" field
4. Assert it is a textbox (or input with date type)
5. Assert the textbox value matches the card's Maintenance date (e.g., "2024-04-28")

## Expected Result

The "Maintenance Date" textbox is prefilled with the date value from the card.

## Test Data

- Use runtime discovery for: Maintenance date values, field labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card with known Maintenance date

## Notes

- Date format is expected to be YYYY-MM-DD; verify at runtime