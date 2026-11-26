# Test Plan: LIMAS-SUD-2696 — SVL-D: Floating Empty State

## Metadata

- **Test ID:** LIMAS-SUD-2696
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When the Floating license count is zero, the section displays "No Floating Licenses" text.

## Scope

Verify the empty-state message for the Floating Licenses section. When a customer has zero Floating licenses, a placeholder message must appear instead of cards. Verified on CLAAS_LMT_DEV (Floating: 0 at time of inspection).

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Customer has zero Floating licenses (badge count is 0)

## Test Steps

1. Identify a customer with zero Floating licenses (e.g., CLAAS_LMT_DEV with Floating: 0 at time of inspection)
2. Expand the card and switch to the Floating tab
3. Assert no Floating license cards are rendered
4. Assert a message element with text "No Floating Licenses" is visible

## Expected Result

The section shows "No Floating Licenses" text and no license cards.

## Test Data

- Use runtime discovery for: customer names with Floating count 0
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Floating licenses

## Notes

- The empty state must not show the "Create Floating License" button or cards
