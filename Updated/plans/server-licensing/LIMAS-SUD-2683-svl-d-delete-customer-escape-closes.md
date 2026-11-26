# Test Plan: LIMAS-SUD-2683 — SVL-D: Delete Customer Escape Closes

## Metadata

- **Test ID:** LIMAS-SUD-2683
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Pressing the Escape key in the confirmation dialog closes the dialog without deleting the customer.

## Scope

Verify that keyboard dismissal via Escape works for the Delete Customer confirmation dialog. The customer must remain unchanged on the page.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Delete Customer confirmation dialog is open for a customer with zero licenses

## Test Steps

1. Open the Delete Customer confirmation dialog for a customer with zero licenses
2. Press the Escape key
3. Assert the confirmation dialog is no longer visible
4. Assert the customer card is still present on the page

## Expected Result

The dialog closes on Escape. The customer record and card remain intact.

## Test Data

- Use runtime discovery for: customer name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with zero Standard and zero Floating licenses

## Notes

- Compare with Cancel button dismissal in LIMAS-SUD-2682
