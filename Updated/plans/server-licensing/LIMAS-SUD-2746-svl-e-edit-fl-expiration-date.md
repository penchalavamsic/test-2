# Test Plan: LIMAS-SUD-2746 — SVL-E: Edit FL Expiration Date

## Metadata

- **Test ID:** LIMAS-SUD-2746
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains a textbox labeled "Expiration Date" prefilled with the card's expiration date value.

## Scope

Verify the Expiration Date field in the Edit Floating License dialog: it must be a textbox, have the correct label, and be prefilled with the date displayed on the card.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open
- Card's Expiration date value has been read before opening

## Test Steps

1. Read the Expiration date from a Floating License card
2. Open the Edit Floating License dialog on that card
3. Locate the "Expiration Date" field
4. Assert it is a textbox (or input with date type)
5. Assert the textbox value matches the card's Expiration date

## Expected Result

The "Expiration Date" textbox is prefilled with the date value from the card.

## Test Data

- Use runtime discovery for: Expiration date values, field labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card with known Expiration date

## Notes

- Date format is expected to be YYYY-MM-DD; verify at runtime