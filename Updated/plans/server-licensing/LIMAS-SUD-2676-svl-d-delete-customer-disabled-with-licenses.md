# Test Plan: LIMAS-SUD-2676 — SVL-D: Delete Customer Disabled With Licenses

## Metadata

- **Test ID:** LIMAS-SUD-2676
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking "Delete Customer" on a customer with assigned Standard or Floating licenses disables the button (no dialog opens).

## Scope

Verify that the Delete Customer button becomes disabled for any customer that has one or more Standard or Floating licenses. No confirmation dialog should appear when the button is in this state. Verified against AGCO (Floating: 11) and BRP (Std: 1, Floating: 2).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded
- Customer has at least one Standard license OR at least one Floating license

## Test Steps

1. Identify a customer with one or more Standard or Floating licenses via tab badge counts
2. Expand that customer's card
3. Attempt to click the "Delete Customer" button
4. Assert the button is disabled (aria-disabled="true" or equivalent)
5. Assert no confirmation dialog appears

## Expected Result

The "Delete Customer" button is disabled. No confirmation dialog opens on interaction.

## Test Data

- Use runtime discovery for: customer names, Standard/Floating tab counts
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Standard or Floating license (e.g., AGCO with Floating: 11, BRP with Std: 1 and Floating: 2 at time of inspection)

## Notes

- Customer names AGCO and BRP are inspection-time examples; use runtime equivalents
- This is a safety guard — deletion blocked when dependencies exist
