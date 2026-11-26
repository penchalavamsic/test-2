# Test Plan: LIMAS-SUD-2730 — SVL-E: Floating Card Edit Button

## Metadata

- **Test ID:** LIMAS-SUD-2730
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** An "Edit Floating License" button is visible on each Floating License card.

## Scope

Verify that every Floating License card has a visible Edit button with an accessible name indicating it edits a Floating License. This is a structural presence check only — do not click the button.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Expand a customer card with at least one Floating license
2. Switch to the Floating tab
3. Locate each Floating license card
4. For each card, assert a button element is present
5. Assert the button has an accessible name containing "Edit" and "Floating License"
6. Assert the button is visible (not hidden or display:none)

## Expected Result

Every Floating license card has a visible button with accessible name "Edit Floating License" (or equivalent).

## Test Data

- Use runtime discovery for: button labels, card count
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Floating license card

## Notes

- This test verifies button presence only — do NOT click the button