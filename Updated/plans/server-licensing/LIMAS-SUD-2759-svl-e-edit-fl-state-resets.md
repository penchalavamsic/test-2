# Test Plan: LIMAS-SUD-2759 — SVL-E: Edit FL State Resets

## Metadata

- **Test ID:** LIMAS-SUD-2759
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** After modifying fields and closing the Edit Floating License dialog without applying, reopening the dialog shows the original pre-edit values — not the discarded modifications.

## Scope

Verify that the Edit Floating License dialog fully resets its state when dismissed without Apply. The dialog must re-read the original card values on each open, not cache discarded edits.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Original card values have been recorded
- Edit Floating License dialog has been closed without Apply and reopened

## Test Steps

1. Read and record the original values from a Floating License card
2. Open the Edit Floating License dialog on that card
3. Modify the Floating Licenses value to a different number
4. Modify the Maintenance Date to a different date
5. Modify the Expiration Date to a different date
6. Click Cancel (or Escape, or Close)
7. Reopen the Edit Floating License dialog
8. Assert the Floating Licenses field shows the original recorded value
9. Assert the Maintenance Date shows the original recorded value
10. Assert the Expiration Date shows the original recorded value

## Expected Result

All fields reset to the original card values on reopen. No discarded modifications persist in dialog state.

## Test Data

- Use runtime discovery for: original card values, dialog field values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card whose values can be read before and after dialog interaction

## Notes

- Read original values immediately before opening to avoid stale data
- Test with Cancel, Escape, and Close to confirm all dismissal methods trigger reset