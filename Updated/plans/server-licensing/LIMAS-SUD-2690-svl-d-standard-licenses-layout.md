# Test Plan: LIMAS-SUD-2690 — SVL-D: Standard Licenses Layout

## Metadata

- **Test ID:** LIMAS-SUD-2690
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Standard Licenses section renders within the expanded customer card, below the Standard/Floating tabs.

## Scope

Verify the position of the Standard Licenses section within the expanded customer card. It must appear below the tab bar containing the Standard and Floating tab buttons.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the Standard/Floating tab bar inside the card
3. Locate the "Standard Licenses" heading
4. Assert the heading appears after (below) the tab bar in document order
5. Assert the entire Standard Licenses section (heading + cards) is within the card boundary

## Expected Result

The Standard Licenses section (heading, description, count badge, cards) is rendered below the Standard/Floating tabs, within the expanded customer card.

## Test Data

- Use runtime discovery for: customer names, tab labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- Layout is verified by DOM order, not visual pixel position
