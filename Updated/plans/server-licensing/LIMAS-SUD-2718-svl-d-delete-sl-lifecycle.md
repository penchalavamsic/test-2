# Test Plan: LIMAS-SUD-2718 — SVL-D: Delete Standard License Lifecycle

## Metadata

- **Test ID:** LIMAS-SUD-2718
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Blocked
- **Atomic Behavior:** After deleting a Standard License, the license card is removed from the list and the Standard tab badge count decrements. The deletion is immediate and destructive without confirmation.

## Scope

Verify the full delete lifecycle: click Delete, card disappears, badge count updates. This would require a runtime-created Standard License that can be safely deleted and verified for absence after page refresh.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- A Standard License exists that was created specifically for this test
- Customer card is expanded, Standard tab is active

## Test Steps

1. Create a unique test Standard License (requires Add Standard License flow, not in SVL-D scope)
2. Record the Standard tab badge count before deletion
3. Click "Delete Standard License" on the test license
4. Assert the license card is removed from the list immediately
5. Assert the Standard tab badge count decrements by 1
6. Refresh the page and re-expand the customer card
7. Assert the deleted license does not reappear

## Expected Result

The Standard License is permanently deleted: card removed, badge count decremented, absent after refresh.

## Test Data

- Use runtime discovery for: badge counts, card presence
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a runtime-created unique Standard License for safe deletion

## Notes

- **BLOCKED.** Standard License deletion is immediate and destructive without confirmation. Safe runtime Standard License creation and cleanup cannot be guaranteed. The "Add Standard License" flow is not in SVL-D scope, and there is no teardown mechanism to restore a test license if the deletion test itself fails or if verification needs a re-run.
- Reason: "Standard License deletion is immediate and destructive without confirmation. Safe runtime Standard License creation and cleanup cannot be guaranteed."
