# Test Plan: LIMAS-SUD-2751 — SVL-E: Edit FL Cancel Closes

## Metadata

- **Test ID:** LIMAS-SUD-2751
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking the Cancel button in the Edit Floating License dialog closes the dialog, and the card values remain unchanged from their original state.

## Scope

Verify that the Cancel button safely dismisses the Edit Floating License dialog without persisting any modifications made to the fields. The card must display the same values as before the dialog was opened.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open
- Original card values (Maintenance, Expiration, Licenses, Max Checkout) have been read before opening

## Test Steps

1. Read and record the original values from a Floating License card
2. Open the Edit Floating License dialog on that card
3. Modify the Floating Licenses spinbutton value
4. Modify the Maintenance Date field (change to a different date)
5. Click the Cancel button
6. Assert the dialog is closed
7. Assert the card's Licenses value matches the original recorded value
8. Assert the card's Maintenance value matches the original recorded value
9. Assert the card's Expiration value matches the original recorded value

## Expected Result

The dialog closes on Cancel. All card values (Licenses, Maintenance, Expiration, Max Checkout) remain unchanged — no modifications are persisted.

## Test Data

- Use runtime discovery for: original card values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card whose values can be read before dialog interaction

## Notes

- Do not click Apply before Cancel — this test verifies Cancel-only behavior
- Read original values immediately before opening to avoid stale data