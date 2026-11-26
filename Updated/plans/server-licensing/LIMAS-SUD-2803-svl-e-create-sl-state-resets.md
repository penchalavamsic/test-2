# Test Plan: LIMAS-SUD-2803 — SVL-E: Create SL State Resets

## Metadata

- **Test ID:** LIMAS-SUD-2803
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** After filling in values and closing the Create Standard License form without applying, reopening the form shows it blank again — all fields reset to empty.

## Scope

Verify that the Create Standard License form fully resets its state when dismissed without Apply. The form must start fresh on each open, not retain discarded entries.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form has been filled, closed without Apply, and reopened

## Test Steps

1. Open the Create Standard License form
2. Enter a value in the Licenses spinbutton (e.g., 5)
3. Enter a value in the Maintenance Date textbox (e.g., "2026-06-01")
4. Enter a value in the Expiration Date textbox (e.g., "2027-06-01")
5. Select a Product Profile option
6. Click Cancel (or Escape, or Close)
7. Reopen the Create Standard License form
8. Assert the Licenses field is empty
9. Assert the Maintenance Date field is empty
10. Assert the Expiration Date field is empty
11. Assert the Product Profile shows its placeholder (no selection retained)

## Expected Result

All fields are blank/empty on reopen. No previously entered values persist.

## Test Data

- Use runtime discovery for: field values, placeholder vs selection
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form that can be opened, filled, closed, and reopened

## Notes

- Test with Cancel, Escape, and Close to confirm all dismissal methods trigger reset
- The form must re-read initial state on each open