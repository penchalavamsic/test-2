# LIMAS-SUD-1263 — Edit License: Edit button Space activation when supported

**Test ID:** LIMAS-SUD-1263  
**Category:** ULH-K — Edit License  
**Module:** User & License Hub  
**Access Profile:** SUPER_USER_ADMIN_USER  
**Plan Status:** Reviewed  
**Script Status:** Generated  
**Execution Status:** Not Run  
**CI/CD Execution:** Pending  
**Healing:** Pending  

## Objective

Verify that the Edit License dialog supports this specific behavior: Edit button Space activation when supported.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER.
- Navigated to /users-licenses (User & License Hub).
- A specific Profile is applied through License Filters.
- A user with licenses is selected.
- The Edit License dialog is open (where applicable).

## Steps

1. Dynamically verify the behavior described.
2. Assert the expected outcome.
3. Restore state after verification.

## Expected

The described behavior matches the observed live application state.

## Notes

- No hardcoded values.
- Runtime-derived test data only.
- Mutation-gated where applicable.
- Safe restoration after scenario.
