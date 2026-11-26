# LIMAS-SUD-1119 — Delete Button on Every Card

## Test ID
LIMAS-SUD-1119

## Feature
User & License Hub — Delete User

## Description
Verify that every loaded user card has a "Delete user" button, including the last card on the page.

## Preconditions
- Logged in as SUPER_USER_ADMIN_USER
- Navigated to `/users-licenses`
- User list loaded

## Steps
1. Wait for user list to load
2. Count the number of visible user cards
3. For each card, locate the "Delete user" button
4. Verify each card has exactly one "Delete user" button
5. Verify the button is visible (not hidden)

## Expected Result
- Every user card has a Delete button
- No card is missing the Delete button
- Button count matches card count

## Mutation Safety
- **Gated:** Presence inspection only — never sends DELETE