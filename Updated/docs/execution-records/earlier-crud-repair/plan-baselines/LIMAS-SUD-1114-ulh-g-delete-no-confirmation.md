# LIMAS-SUD-1114 — Delete Is Single-Click (No Confirmation Dialog)

## Test ID
LIMAS-SUD-1114

## Feature
User & License Hub — Delete User

## Description
Verify that clicking "Delete user" immediately sends a DELETE request without any confirmation dialog.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- User list loaded
- **TEST_ULH_ALLOW_USER_DELETE=true** in `.env`

## Steps
1. Wait for user list to load
2. Start network monitoring (capture all requests)
3. Locate the "Delete user" button on the first user card
4. Click the "Delete user" button
5. Observe: no dialog, modal, or confirmation prompt appears
6. Check network: a DELETE request is sent immediately

## Expected Result
- No confirmation dialog, modal, or prompt appears after clicking
- A DELETE request to `/limas/api/users/{userId}` is sent immediately
- The delete is executed as a single-click destructive action

## Mutation Safety
- **Gated:** Requires TEST_ULH_ALLOW_USER_DELETE=true
- Must NOT be run against production or shared environments
- Test environment must have disposable test users