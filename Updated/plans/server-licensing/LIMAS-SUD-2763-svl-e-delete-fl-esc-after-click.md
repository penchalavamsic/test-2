# Test Plan: LIMAS-SUD-2763 — SVL-E: Delete FL Esc After Click

## Metadata

- **Test ID:** LIMAS-SUD-2763
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Pressing Escape after clicking Delete Floating License does not dismiss any dialog (because no confirmation dialog exists), and the card remains present.

## Scope

Verify that Escape key behavior after clicking Delete does not cause unexpected side effects. Since no confirmation dialog appears, Escape should be a no-op in this context and the card should remain unchanged.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Delete Floating License button has been clicked

## Test Steps

1. Record the heading and content of a Floating License card
2. Click the Delete Floating License button
3. Assert no confirmation dialog appeared
4. Press the Escape key
5. Assert the card is still present and visible
6. Assert the card heading and content match the recorded values

## Expected Result

No dialog is dismissed (none exists), and the Floating License card remains present unchanged.

## Test Data

- Use runtime discovery for: card text, dialog presence
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card

## Notes

- This test documents behavior only — do NOT click Delete in automated tests
- Escape should be a safe no-op in the absence of a dialog