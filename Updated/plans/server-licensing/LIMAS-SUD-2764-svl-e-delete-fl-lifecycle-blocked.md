# Test Plan: LIMAS-SUD-2764 — SVL-E: Delete FL Lifecycle Blocked

## Metadata

- **Test ID:** LIMAS-SUD-2764
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Blocked
- **Atomic Behavior:** The complete Floating License delete lifecycle — click Delete, card removal, badge count update, persistence after refresh — cannot be verified because the current Delete behavior is incomplete.

## Scope

Document that the complete delete lifecycle test is blocked. The current Delete button has no confirmation dialog but also does not immediately delete the license. The full flow from click to verified removal cannot be guaranteed.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- A Floating License exists that was created specifically for this test
- Customer card is expanded, Floating tab is active

## Test Steps

1. Create a unique test Floating License (requires Create Floating License flow)
2. Record the Floating tab badge count before deletion
3. Click "Delete Floating License" on the test license
4. Assert the license card is removed from the list (blocked — current behavior does not remove)
5. Assert the Floating tab badge count decrements by 1 (blocked)
6. Refresh the page and re-expand the customer card
7. Assert the deleted license does not reappear (blocked)

## Expected Result

N/A — test is blocked. The complete delete lifecycle cannot be verified.

## Test Data

- Use runtime discovery for: badge counts, card presence
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a runtime-created unique Floating License for safe deletion (blocked)

## Notes

- **BLOCKED.** Delete Floating License has no confirmation dialog but also does not immediately delete. The complete lifecycle flow is unclear. Safe runtime creation and cleanup cannot be guaranteed.
- Reason: "Delete Floating License has no confirmation dialog but also does not immediately delete. The complete lifecycle flow is unclear. Safe runtime creation and cleanup cannot be guaranteed."