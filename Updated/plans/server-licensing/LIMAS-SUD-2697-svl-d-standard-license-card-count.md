# Test Plan: LIMAS-SUD-2697 — SVL-D: Standard License Card Count

## Metadata

- **Test ID:** LIMAS-SUD-2697
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The number of rendered Standard license cards matches the tab badge count.

## Scope

Verify that the count of actual Standard license card elements on the page equals the numeric value shown on the Standard tab badge.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard license

## Test Steps

1. Expand a customer card with a non-zero Standard count
2. Read the numeric count from the Standard tab badge
3. Count the number of Standard license card elements in the DOM
4. Assert the card count equals the badge count

## Expected Result

The number of Standard license card elements rendered matches the tab badge count.

## Test Data

- Use runtime discovery for: customer names, Standard badge count, card elements
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with at least one Standard license

## Notes

- Also covers the case where count is zero and no cards render
