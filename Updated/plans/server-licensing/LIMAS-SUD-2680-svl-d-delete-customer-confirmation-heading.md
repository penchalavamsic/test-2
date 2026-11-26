# Test Plan: LIMAS-SUD-2680 — SVL-D: Delete Customer Confirmation Heading

## Metadata

- **Test ID:** LIMAS-SUD-2680
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The confirmation dialog contains a heading (likely "Delete Customer" or similar) at an appropriate heading level.

## Scope

Verify that the Delete Customer confirmation dialog has a semantic heading element that clearly identifies the action context to all users, including those using assistive technology.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Delete Customer confirmation dialog is open (triggered from a customer with zero licenses)

## Test Steps

1. Open the Delete Customer confirmation dialog for a customer with zero licenses
2. Locate a heading element within the dialog region
3. Assert the heading text contains "Delete Customer" or similar identifying text
4. Assert the heading uses a semantic heading level (h2, h3, or role="heading")

## Expected Result

A semantic heading (e.g., "Delete Customer") is present inside the confirmation dialog at an appropriate level in the heading hierarchy.

## Test Data

- Use runtime discovery for: customer name, heading text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard and zero Floating licenses

## Notes

- Heading text may include the customer name (e.g., "Delete Customer ACME_Corp")
