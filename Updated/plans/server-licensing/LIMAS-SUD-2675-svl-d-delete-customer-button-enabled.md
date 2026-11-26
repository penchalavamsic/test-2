# Test Plan: LIMAS-SUD-2675 — SVL-D: Delete Customer Button Enabled

## Metadata

- **Test ID:** LIMAS-SUD-2675
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The "Delete Customer" button is enabled when the customer has no assigned Standard or Floating licenses.

## Scope

Verify the enabled state of the Delete Customer button depends on whether the customer has any Standard or Floating licenses. A customer with zero licenses of both types must show the button as enabled.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded
- Customer has zero Standard licenses AND zero Floating licenses (confirmed via tab badges)

## Test Steps

1. Identify a customer with zero Standard and zero Floating licenses via tab badge counts
2. Expand that customer's card
3. Locate the "Delete Customer" button
4. Assert the button is not disabled

## Expected Result

The "Delete Customer" button is enabled (aria-disabled is false or absent, and the button responds to interaction).

## Test Data

- Use runtime discovery for: customer names, Standard/Floating tab counts
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard and zero Floating licenses

## Notes

- If no such customer exists at runtime, the test is skipped with a note
- Opposite scenario (disabled when licenses exist) covered by LIMAS-SUD-2676
