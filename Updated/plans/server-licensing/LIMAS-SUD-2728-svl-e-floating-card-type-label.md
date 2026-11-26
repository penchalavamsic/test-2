# Test Plan: LIMAS-SUD-2728 — SVL-E: Floating Card Type Label

## Metadata

- **Test ID:** LIMAS-SUD-2728
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Floating License card displays a type label "Floating License" visible on the card.

## Scope

Verify that every Floating License card has a visible type label identifying it as a "Floating License". This label distinguishes Floating license cards from Standard license cards.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Expand a customer card with at least one Floating license
2. Switch to the Floating tab
3. Locate each Floating license card
4. For each card, assert a type label "Floating License" is present and visible
5. Assert the label is rendered as a badge or prefix text on the card

## Expected Result

Every Floating license card has a visible "Floating License" type label.

## Test Data

- Use runtime discovery for: card count, type label text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Floating license card

## Notes

- The type label may be a badge, chip, or prefix text — discover format at runtime