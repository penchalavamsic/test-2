# LIMAS-SUD-1116 — Page Refreshes After Delete

## Test ID
LIMAS-SUD-1116

## Feature
User & License Hub — Delete User

## Description
Verify that the user list auto-refreshes after a successful DELETE.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- **TEST_ULH_ALLOW_USER_DELETE=true** in `.env`

## Steps
1. Wait for user list to load
2. Note the current total user count and visible user names
3. Click "Delete user" on the first card (note: this is destructive)
4. After the DELETE response, observe the network
5. Verify a new GET `/limas/api/users/f?...` request is sent to refresh the list
6. Verify the new GET completes successfully (200)

## Expected Result
- After DELETE 200, a new GET request is sent automatically
- The user list refreshes with updated data
- No manual page reload required

## Mutation Safety
- **Gated:** Requires TEST_ULH_ALLOW_USER_DELETE=true