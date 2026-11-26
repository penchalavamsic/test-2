# Test Plan: LIMAS-SUD-2679 — SVL-D: Delete Customer Confirmation Opens

## Metadata

- **Test ID:** LIMAS-SUD-2679
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking "Delete Customer" on a customer with zero licenses opens a confirmation dialog with role="region" and an accessible name.

## Scope

Verify that the confirmation dialog opens when Delete Customer is clicked on a customer that has no Standard or Floating licenses. The dialog must be a named region element.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded
- Customer has zero Standard licenses AND zero Floating licenses

## Test Steps

1. Identify a customer with zero Standard and zero Floating licenses
2. Expand that customer's card
3. Click the "Delete Customer" button
4. Assert a dialog/region element appears
5. Assert the region has role "region" (or "dialog")
6. Assert the region has a non-empty accessible name

## Expected Result

A confirmation region with an accessible name appears, containing controls to proceed or cancel the deletion.

## Test Data

- Use runtime discovery for: customer names with zero licenses
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard and zero Floating licenses

## Notes

- This test does not confirm deletion — only that the confirmation step opens
- Do not complete the deletion flow in this test
