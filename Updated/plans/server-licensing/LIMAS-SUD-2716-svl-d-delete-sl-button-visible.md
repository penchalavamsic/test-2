# Test Plan: LIMAS-SUD-2716 — SVL-D: Delete Standard License Button Visible

## Metadata

- **Test ID:** LIMAS-SUD-2716
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** A "Delete Standard License" button is visible on each Standard License card within an expanded customer card.

## Scope

Verify that every Standard License card has a visible Delete button with an accessible name indicating it deletes a Standard License. This is a structural presence check only — do not click the button.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard License card

## Test Steps

1. Expand a customer card with at least one Standard License
2. Locate each Standard License card
3. For each card, assert a button element is present
4. Assert the button has an accessible name containing "Delete" and "Standard License"
5. Assert the button is visible (not hidden or display:none)

## Expected Result

Every Standard License card has a visible button with accessible name "Delete Standard License" (or equivalent).

## Test Data

- Use runtime discovery for: button labels, card count
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Standard License card

## Notes

- This test verifies button presence only — do NOT click the button
- Delete is immediate and destructive with no confirmation; clicking would remove a license
