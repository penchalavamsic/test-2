# LIMAS-SUD-1113 — Delete Button Accessible Name

## Test ID
LIMAS-SUD-1113

## Feature
User & License Hub — Delete User

## Description
Verify that the "Delete user" button on a user card has the accessible name "Delete user".

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- User list loaded

## Steps
1. Wait for user list to load
2. Locate the "Delete user" button on the first loaded user card
3. Read its accessible name (via `getByRole('button', { name: 'Delete user' })`)
4. Confirm the accessible name is exactly "Delete user"

## Expected Result
- `getByRole('button', { name: 'Delete user' })` resolves to exactly one button per card
- The accessible name is "Delete user"

## Mutation Safety
- **Gated:** Do NOT click — presence/inspection only
- Never sends DELETE