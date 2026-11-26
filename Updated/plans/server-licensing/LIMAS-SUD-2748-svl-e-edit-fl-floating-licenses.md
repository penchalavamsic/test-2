# Test Plan: LIMAS-SUD-2748 — SVL-E: Edit FL Floating Licenses

## Metadata

- **Test ID:** LIMAS-SUD-2748
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains a spinbutton labeled "Floating Licenses" prefilled with the card's Licenses value (e.g., "10").

## Scope

Verify the Floating Licenses field in the Edit Floating License dialog: it must be a spinbutton, have the correct label, and be prefilled with the Licenses count displayed on the card.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open
- Card's Licenses count has been read before opening

## Test Steps

1. Read the Licenses value from a Floating License card
2. Open the Edit Floating License dialog on that card
3. Locate the "Floating Licenses" field
4. Assert it is a spinbutton (or input with type number)
5. Assert the spinbutton value matches the card's Licenses count (e.g., "10")

## Expected Result

The "Floating Licenses" spinbutton is prefilled with the card's Licenses count.

## Test Data

- Use runtime discovery for: Licenses values, field labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card with known Licenses count

## Notes

- The field name "Floating Licenses" distinguishes this from the Standard dialog's "Number of Standard Licenses"