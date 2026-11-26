# Test Plan: LIMAS-SUD-2695 — SVL-D: Standard Empty State

## Metadata

- **Test ID:** LIMAS-SUD-2695
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When the Standard license count is zero, the section displays "No Standard Licenses" text.

## Scope

Verify the empty-state message for the Standard Licenses section. When a customer has zero Standard licenses, a placeholder message must appear instead of cards. Verified on AGCO (Standard: 0 at time of inspection).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has zero Standard licenses (badge count is 0)

## Test Steps

1. Identify a customer with zero Standard licenses (e.g., AGCO with Standard: 0 at time of inspection)
2. Expand the card and ensure Standard tab is active
3. Assert no Standard license cards are rendered
4. Assert a message element with text "No Standard Licenses" is visible

## Expected Result

The section shows "No Standard Licenses" text and no license cards.

## Test Data

- Use runtime discovery for: customer names with Standard count 0
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard licenses

## Notes

- The empty state must not show the "Create Standard License" button or cards
