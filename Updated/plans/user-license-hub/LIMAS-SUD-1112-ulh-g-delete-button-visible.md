# LIMAS-SUD-1112 — Delete Button Visible on User Card

## Test ID
LIMAS-SUD-1112

## Feature
User & License Hub — Delete User

## Description
Verify that a "Delete user" button is visible on every loaded user card on the results page.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- User list loaded (default page 1, size 20)

## Steps
1. Wait for user list to load (user cards visible)
2. Locate the action buttons area on the first user card
3. Identify the "Delete user" button by its accessible name
4. Verify the button is visible (not hidden, not disabled)
5. Repeat for all visible user cards on the current page

## Expected Result
- Every user card on the page has a visible "Delete user" button
- Button is identifiable by accessible name "Delete user"

## Mutation Safety
- **Gated:** Do NOT click the button without TEST_ULH_ALLOW_USER_DELETE set
- This test verifies UI presence only — never sends DELETE

## Notes
- No confirmation dialog exists — clicking immediately deletes
- Runtime-derived values only; no hardcoded names/IDs