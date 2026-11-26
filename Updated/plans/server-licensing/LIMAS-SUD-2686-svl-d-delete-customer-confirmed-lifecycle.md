# Test Plan: LIMAS-SUD-2686 — SVL-D: Delete Customer Confirmed Lifecycle

## Metadata

- **Test ID:** LIMAS-SUD-2686
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Blocked
- **Atomic Behavior:** Confirming deletion on a customer with zero licenses removes the customer card and the customer no longer appears in the list.

## Scope

Verify the full confirmed-deletion lifecycle: the Delete button on a zero-license customer opens the confirmation dialog, the Confirm/Delete action within the dialog triggers deletion, the customer card disappears, and the customer is absent from the customer list after a refresh.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- A customer exists that was created specifically for this test and has zero Standard and zero Floating licenses
- Customer card is expanded

## Test Steps

1. Create a unique test customer (requires Add Customer flow, not in SVL-D scope)
2. Confirm the customer has zero Standard and zero Floating licenses
3. Click "Delete Customer" on the test customer
4. Confirm the deletion in the confirmation dialog
5. Assert the customer card is removed from the page
6. Assert the customer no longer appears in the customer list after page refresh

## Expected Result

The customer is permanently deleted and no longer appears in the Server License Management page.

## Test Data

- Use runtime discovery for: newly created customer name
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a runtime-created unique customer with zero licenses

## Notes

- **BLOCKED.** Safe runtime customer creation and cleanup cannot be guaranteed. The "Add Customer" flow is not in SVL-D scope, and there is no teardown mechanism to remove a test customer if the deletion test itself fails.
- Reason: "Safe runtime customer creation and cleanup cannot be guaranteed. Add Customer flow is not in SVL-D scope."
