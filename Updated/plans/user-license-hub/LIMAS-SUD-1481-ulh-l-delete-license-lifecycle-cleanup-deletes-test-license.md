# LIMAS-SUD-1481

**Test ID:** LIMAS-SUD-1481
**Category:** ULH-L
**Module:** User & License Hub
**Access Profile:** SUPER_USER_ADMIN_USER
**Plan Status:** Reviewed
**Script Status:** Generated
**Execution Status:** Not Run

## Objective

Lifecycle cleanup deletes test license

## Notes

- Mutation-gated: TEST_ULH_ALLOW_LICENSE_MUTATION + TEST_ULH_ALLOW_LICENSE_DELETE
- No confirmation dialog — deletion is immediate one-click
- Lifecycle license creation via ULH-J Add License flow
- Runtime-derived test data only
- Cleanup in finally