# Test Plan: LIMAS-SUD-2692 — SVL-D: Standard Floating Tab Counts

## Metadata

- **Test ID:** LIMAS-SUD-2692
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Tab count badges display the actual number of license cards at runtime.

## Scope

Verify that the numeric counts shown on the Standard and Floating tab buttons accurately reflect the number of license cards that exist in each category for that customer.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded
- Customer has at least one Standard or Floating license (to validate count > 0)

## Test Steps

1. Expand a customer card
2. Read the numeric count from the "Standard" tab badge
3. Switch to the Standard tab (if not already active)
4. Count the number of Standard license cards
5. Assert the badge count equals the card count
6. Read the numeric count from the "Floating" tab badge
7. Switch to the Floating tab
8. Count the number of Floating license cards
9. Assert the badge count equals the card count

## Expected Result

Each tab badge count matches the actual number of rendered license cards in that category.

## Test Data

- Use runtime discovery for: customer names, Standard card count, Floating card count, tab badge values
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with known non-zero Standard or Floating counts (e.g., BRP with Std: 1, Floating: 2 at time of inspection)

## Notes

- For zero-count tabs, the corresponding section may show an empty state
