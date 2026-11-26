# Test Plan: LIMAS-SUD-2710 — SVL-D: Edit Standard License Cancel Closes Without Persisting

## Metadata

- **Test ID:** LIMAS-SUD-2710
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking the Cancel button in the Edit Standard License dialog closes the dialog, and the card values remain unchanged from their original state.

## Scope

Verify that the Cancel button safely dismisses the Edit Standard License dialog without persisting any modifications made to the fields. The card must display the same values as before the dialog was opened.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Edit Standard License dialog is open
- Original card values (Maintenance, Expiration, Licenses) have been read before opening

## Test Steps

1. Read and record the original values from a Standard License card
2. Open the Edit Standard License dialog on that card
3. Modify the Number of Standard Licenses field (change the spinbutton value)
4. Modify the Maintenance Date field (change to a different date)
5. Click the Cancel button
6. Assert the dialog is closed
7. Assert the card's Licenses value matches the original recorded value
8. Assert the card's Maintenance value matches the original recorded value
9. Assert the card's Expiration value matches the original recorded value

## Expected Result

The dialog closes on Cancel. All card values (Licenses, Maintenance, Expiration) remain unchanged — no modifications are persisted.

## Test Data

- Use runtime discovery for: original card values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Standard License card whose values can be read before dialog interaction

## Notes

- Do not click Apply before Cancel — this test verifies Cancel-only behavior
- Read original values immediately before opening to avoid stale data
