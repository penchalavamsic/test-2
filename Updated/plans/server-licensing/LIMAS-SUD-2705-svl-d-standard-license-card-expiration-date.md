# Test Plan: LIMAS-SUD-2705 — SVL-D: Standard License Card Expiration Date

## Metadata

- **Test ID:** LIMAS-SUD-2705
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Each Standard License card displays an Expiration field with a label and a date string discovered at runtime.

## Scope

Verify that the Expiration date field is present on Standard License cards and contains a readable date string. The exact format and value are discovered at runtime.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard license card

## Test Steps

1. Expand a customer card with at least one Standard license
2. Locate a Standard license card
3. Locate the field labeled "Expiration" (or equivalent discovered label)
4. Assert the label is visible
5. Assert a non-empty date string is displayed
6. Read and log the actual value

## Expected Result

The Expiration field label and a date string are visible on each Standard license card.

## Test Data

- Use runtime discovery for: expiration date strings, field label text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: at least one Standard license card

## Notes

- Date format may vary; do not assert a specific format, only presence
