# Test Plan: LIMAS-SUD-2682 — SVL-D: Delete Customer Cancel Closes

## Metadata

- **Test ID:** LIMAS-SUD-2682
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking the Cancel button in the confirmation dialog closes the dialog without deleting the customer.

## Scope

Verify that the Cancel button in the Delete Customer confirmation dialog dismisses the dialog and leaves the customer record intact. No deletion occurs.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Delete Customer confirmation dialog is open for a customer with zero licenses
- Customer card is still present

## Test Steps

1. Open the Delete Customer confirmation dialog for a customer with zero licenses
2. Locate the Cancel button within the dialog
3. Click the Cancel button
4. Assert the confirmation dialog is no longer visible
5. Assert the customer card is still present on the page

## Expected Result

The dialog closes. The customer card remains visible on the page — no data was deleted.

## Test Data

- Use runtime discovery for: customer name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard and zero Floating licenses

## Notes

- Compare with Escape key dismissal in LIMAS-SUD-2683
