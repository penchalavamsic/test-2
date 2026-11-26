# LIMAS-SUD-1115 — Delete API Endpoint Contract

## Test ID
LIMAS-SUD-1115

## Feature
User & License Hub — Delete User

## Description
Verify that the DELETE request targets the correct API endpoint with the correct user ID.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- **TEST_ULH_ALLOW_USER_DELETE=true** in `.env`
- Test user ID known (from API response)

## Steps
1. Wait for user list to load
2. Capture the user ID from the API response of the first user card
3. Start network monitoring
4. Click "Delete user" on the first card
5. Capture the DELETE request URL
6. Verify the URL pattern: `/limas/api/users/{userId}`
7. Verify the userId in the URL matches the captured user ID
8. Verify the HTTP method is DELETE

## Expected Result
- DELETE request URL matches pattern: `/limas/api/users/{userId}`
- The userId in the URL is the correct user ID from the card
- HTTP method is DELETE
- No request body or query parameters

## Mutation Safety
- **Gated:** Requires TEST_ULH_ALLOW_USER_DELETE=true