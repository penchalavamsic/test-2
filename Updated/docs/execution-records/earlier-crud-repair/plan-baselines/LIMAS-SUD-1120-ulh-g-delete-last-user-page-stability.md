# LIMAS-SUD-1120 — Delete Last User on Page — Page Stability

## Test ID
LIMAS-SUD-1120

## Feature
User & License Hub — Delete User

## Description
Verify that deleting the last user on a non-first page stays on the same page (or navigates back to the previous page) rather than showing an empty list.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- **TEST_ULH_ALLOW_USER_DELETE=true** in `.env`
- Navigate to a page with exactly one user (or the last page)

## Steps
1. Navigate to the last page of the user list
2. Verify there is at least 1 user visible
3. Click "Delete user" on the last visible user
4. Wait for the user list to refresh
5. Verify the page is not showing an empty list
6. Verify the list either stays on the current page (with remaining data) or navigates to the previous page

## Expected Result
- After deleting the last user on a page, the list does not show an empty state
- Either the page index adjusts or the previous page loads

## Mutation Safety
- **Gated:** Requires TEST_ULH_ALLOW_USER_DELETE=true