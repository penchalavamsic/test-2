# Test Plan: LIMAS-SUD-2740 — SVL-E: Floating Card Multiple Cards

## Metadata

- **Test ID:** LIMAS-SUD-2740
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When multiple Floating licenses exist, each renders as an independent card with a distinct heading.

## Scope

Verify that multiple Floating license cards render independently within the Floating tab view, each with its own distinct h3 heading. No cards should visually overlap or share headings.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least two Floating license cards (badge count >= 2)

## Test Steps

1. Identify a customer with at least two Floating licenses (badge count >= 2)
2. Expand the customer card and switch to the Floating tab
3. Count all Floating license card elements
4. Assert the count is >= 2
5. For each card, locate its h3 heading
6. Assert each heading text is non-empty
7. Assert all heading texts are distinct from each other

## Expected Result

All Floating license cards render independently with distinct h3 headings and no overlap.

## Test Data

- Use runtime discovery for: card count, license names, heading texts
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least two Floating license cards

## Notes

- Cards are expected to stack vertically or in a grid; discover layout at runtime