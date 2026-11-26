# LIMAS-SUD-1118 — Total User Count Decrements After Delete

## Test ID
LIMAS-SUD-1118

## Feature
User & License Hub — Delete User

## Description
Verify that the "Showing X–Y of Z" count decrements by 1 after a successful delete.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- **TEST_ULH_ALLOW_USER_DELETE=true** in `.env`

## Steps
1. Wait for user list to load
2. Read the "Showing X–Y of Z" text and extract total count Z
3. Click "Delete user" on the first user card
4. Wait for the user list to refresh
5. Read the new "Showing X–Y of Z'" text
6. Verify Z' = Z - 1

## Expected Result
- Total user count decrements by exactly 1 after deletion
- Page number and size remain consistent (unless the deleted user was the last on a page)

## Mutation Safety
- **Gated:** Requires TEST_ULH_ALLOW_USER_DELETE=true