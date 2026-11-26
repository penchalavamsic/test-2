# LIMAS-SUD-1117 — Deleted User Removed from List

## Test ID
LIMAS-SUD-1117

## Feature
User & License Hub — Delete User

## Description
Verify that the deleted user no longer appears in the user list after refresh.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- **TEST_ULH_ALLOW_USER_DELETE=true** in `.env`
- Test user created and visible on the current page

## Steps
1. Wait for user list to load
2. Capture the user ID and name of the user to be deleted
3. Click "Delete user" on that user's card
4. Wait for the user list to refresh
5. Search through all visible user cards for the deleted user's name
6. Verify the deleted user's name does not appear in the refreshed list

## Expected Result
- The deleted user is absent from the refreshed user list
- Their card no longer renders on the page

## Mutation Safety
- **Gated:** Requires TEST_ULH_ALLOW_USER_DELETE=true
- Use disposable test users only