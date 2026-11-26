# Test Plan: LIMAS-SUD-2715 — SVL-D: Edit Standard License Dialog State Resets on Reopen

## Metadata

- **Test ID:** LIMAS-SUD-2715
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** After modifying fields in the Edit Standard License dialog and closing without applying, reopening the dialog shows the original card values — not the discarded modifications.

## Scope

Verify that the dialog state fully resets to the card's current values each time it is opened. Discarded edits from a previous session must not persist in the dialog state.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Edit Standard License dialog has been previously opened, modified, and closed via Cancel/Close/Escape

## Test Steps

1. Open the Edit Standard License dialog on a Standard License card
2. Record the original values of all fields (Maintenance Date, Expiration Date, Number of Days, Number of Standard Licenses, Synchronize checkbox)
3. Change the Maintenance Date to a different date
4. Change the Number of Standard Licenses to a different value
5. Check the "Synchronize Maintenance and Expiration dates" checkbox
6. Click Cancel to close the dialog
7. Reopen the Edit Standard License dialog on the same card
8. Assert the Maintenance Date field shows the original value (not the changed one)
9. Assert the Number of Standard Licenses field shows the original value
10. Assert the "Synchronize Maintenance and Expiration dates" checkbox is unchecked (original state)
11. Assert the Number of Days field is empty (original state)

## Expected Result

All fields in the reopened dialog show the original card values, fully reset from any discarded modifications.

## Test Data

- Use runtime discovery for: original field values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Standard License card with known field values

## Notes

- This tests that the dialog state is re-initialized from card data on each open, not cached from the previous session
- Do not click Apply at any point in this test
