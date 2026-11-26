# Test Plan: LIMAS-SUD-2739 — SVL-E: Floating Card Count Matches Badge

## Metadata

- **Test ID:** LIMAS-SUD-2739
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The number of rendered Floating license cards matches the Floating tab badge count.

## Scope

Verify that the count of actual Floating license card elements on the page equals the numeric value shown on the Floating tab badge.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has at least one Floating license

## Test Steps

1. Expand a customer card with a non-zero Floating count
2. Read the numeric count from the Floating tab badge
3. Switch to the Floating tab
4. Count the number of Floating license card elements in the DOM
5. Assert the card count equals the badge count

## Expected Result

The number of Floating license card elements rendered matches the tab badge count.

## Test Data

- Use runtime discovery for: customer names, Floating badge count, card elements
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Floating license

## Notes

- Also covers the case where count is zero and no cards render