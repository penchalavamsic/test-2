# Test Plan: LIMAS-SUD-2700 — SVL-D: Standard License Card Scrolling

## Metadata

- **Test ID:** LIMAS-SUD-2700
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When Standard license cards overflow the available space, a scroll container allows navigation through all cards.

## Scope

Verify that the Standard Licenses section handles overflow gracefully with a scrollable container, ensuring all cards remain accessible even when they exceed the visible area.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has enough Standard license cards to overflow the section (discovered at runtime)

## Test Steps

1. Identify a customer with many Standard licenses (or simulate overflow by viewport resizing)
2. Expand the card and ensure Standard tab is active
3. Assert that not all cards are fully visible in the viewport (overflow condition)
4. Assert that the card container supports scrolling (overflow: auto or scroll)
5. Scroll to the last card
6. Assert the last card becomes visible and its content is intact

## Expected Result

A scrollable container allows access to all Standard license cards, including those initially outside the viewport.

## Test Data

- Use runtime discovery for: customer names with many licenses, card count
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with enough Standard licenses to overflow, or resize viewport to test

## Notes

- If no customer has enough cards to overflow, resize the browser viewport to force overflow
