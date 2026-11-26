# Test Plan: LIMAS-SUD-2689 — SVL-D: Standard Licenses Count Badge

## Metadata

- **Test ID:** LIMAS-SUD-2689
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** A count badge shows "N license(s)" matching the actual number of Standard license cards rendered.

## Scope

Verify that the Standard Licenses section displays a badge summarizing the count of Standard license cards, and that the count matches the actual number of rendered cards.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the count badge near the "Standard Licenses" heading
3. Read the badge text (e.g., "1 license" or "2 licenses")
4. Count the actual Standard license cards rendered in the section
5. Assert the badge count matches the number of cards

## Expected Result

The badge displays a count string (e.g., "N license(s)") that equals the number of Standard license cards visible in the section.

## Test Data

- Use runtime discovery for: customer names, card count
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- Pluralization ("license" vs "licenses") is discovered at runtime
- A count of zero may display "0 licenses" or hide the badge entirely
