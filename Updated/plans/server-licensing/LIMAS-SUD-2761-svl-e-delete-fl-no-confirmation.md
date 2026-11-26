# Test Plan: LIMAS-SUD-2761 — SVL-E: Delete FL No Confirmation Dialog

## Metadata

- **Test ID:** LIMAS-SUD-2761
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking "Delete Floating License" does NOT open a confirmation dialog. The button may become [active] but no dialog appears and the card remains.

## Scope

Document the observed behavior that clicking Delete Floating License does not trigger a confirmation dialog. This test documents behavior only — do NOT click the button in automated tests.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Observe the Delete Floating License button on a card
2. Document that there is no confirmation dialog trigger associated with this button
3. Document that clicking Delete results in no dialog appearing
4. Assert the card remains present after click

## Expected Result

No confirmation dialog appears when clicking Delete Floating License. The card remains visible.

## Test Data

- Use runtime discovery for: button presence, dialog absence
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card

## Notes

- **WARNING:** This test documents behavior only — do NOT click Delete in automated tests
- The absence of a confirmation dialog may indicate a UX gap for destructive actions
- Observation source: STIHL EOL Tester environment