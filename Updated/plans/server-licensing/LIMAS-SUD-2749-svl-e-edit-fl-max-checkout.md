# Test Plan: LIMAS-SUD-2749 — SVL-E: Edit FL Max Checkout

## Metadata

- **Test ID:** LIMAS-SUD-2749
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog contains a spinbutton labeled "Max Checkout (hours)" prefilled with the card's Max Checkout value (e.g., "2").

## Scope

Verify the Max Checkout field in the Edit Floating License dialog: it must be a spinbutton, have the label "Max Checkout (hours)", and be prefilled with the checkout duration shown on the card (numeric value only, without the "h" suffix).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open
- Card's Max Checkout value has been read before opening

## Test Steps

1. Read the Max Checkout value from a Floating License card (e.g., "2h")
2. Open the Edit Floating License dialog on that card
3. Locate the "Max Checkout (hours)" field
4. Assert it is a spinbutton (or input with type number)
5. Assert the spinbutton value matches the numeric portion of the card's Max Checkout (e.g., "2")

## Expected Result

The "Max Checkout (hours)" spinbutton is prefilled with the numeric value from the card's Max Checkout (without "h" suffix).

## Test Data

- Use runtime discovery for: Max Checkout values, field labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card with known Max Checkout value

## Notes

- The label includes "(hours)" to clarify the unit; the spinbutton value is numeric only