# LIMAS-SUD-1121 — Delete Response Status 200

## Test ID
LIMAS-SUD-1121

## Feature
User & License Hub — Delete User

## Description
Verify that a successful DELETE returns HTTP status 200.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- **TEST_ULH_ALLOW_USER_DELETE=true** in `.env`

## Steps
1. Wait for user list to load
2. Start network monitoring
3. Click "Delete user" on the first user card
4. Capture the DELETE response
5. Verify response status code is 200

## Expected Result
- `DELETE /limas/api/users/{userId}` returns HTTP 200 on success
- Response is received within a reasonable timeout

## Mutation Safety
- **Gated:** Requires TEST_ULH_ALLOW_USER_DELETE=true