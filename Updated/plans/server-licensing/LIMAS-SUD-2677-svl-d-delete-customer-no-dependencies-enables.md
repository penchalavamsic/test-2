# Test Plan: LIMAS-SUD-2677 — SVL-D: Delete Customer No Dependencies Enables

## Metadata

- **Test ID:** LIMAS-SUD-2677
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The "Delete Customer" button remains enabled for customers with zero Standard and zero Floating licenses.

## Scope

Confirm that the Delete Customer button stays enabled when a customer has no license dependencies — both the Standard count and Floating count are zero. This is the precondition for deletion to proceed.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded
- Customer has exactly zero Standard licenses AND zero Floating licenses

## Test Steps

1. Identify a customer with zero Standard and zero Floating licenses via tab badge counts
2. Expand that customer's card
3. Locate the "Delete Customer" button
4. Assert the button is enabled (not disabled)

## Expected Result

The "Delete Customer" button is enabled and ready to trigger the confirmation dialog.

## Test Data

- Use runtime discovery for: customer names, Standard/Floating tab counts
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard and zero Floating licenses

## Notes

- This is the affirmative counterpart to LIMAS-SUD-2676
