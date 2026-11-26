# Test Plan: LIMAS-SUD-2735 — SVL-E: Floating Card Max Checkout

## Metadata

- **Test ID:** LIMAS-SUD-2735
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Floating License card displays a Max Checkout label and value with an "h" suffix (e.g., "2h") discovered at runtime.

## Scope

Verify that every Floating License card shows a Max Checkout field with a label and a value ending in "h" (hours). The specific duration value is discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license card

## Test Steps

1. Expand a customer card with at least one Floating license
2. Switch to the Floating tab
3. Locate the first Floating license card
4. Assert a label "Max Checkout" is visible on the card
5. Assert a corresponding value is visible next to the label (e.g., "2h")
6. Assert the value ends with "h" indicating hours

## Expected Result

Each Floating license card displays a "Max Checkout" label with a value suffixed by "h" (e.g., "2h").

## Test Data

- Use runtime discovery for: Max Checkout values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Floating license card

## Notes

- The "h" suffix indicates the checkout duration in hours