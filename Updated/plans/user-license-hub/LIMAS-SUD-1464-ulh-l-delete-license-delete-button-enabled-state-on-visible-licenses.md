# LIMAS-SUD-1464

**Test ID:** LIMAS-SUD-1464
**Category:** ULH-L
**Module:** User & License Hub
**Access Profile:** SUPER_USER_ADMIN_USER
**Plan Status:** Reviewed
**Script Status:** Generated
**Execution Status:** Not Run

## Objective

Delete button enabled state on visible licenses

## Notes

- Mutation-gated: TEST_ULH_ALLOW_LICENSE_MUTATION + TEST_ULH_ALLOW_LICENSE_DELETE
- No confirmation dialog — deletion is immediate one-click
- Lifecycle license creation via ULH-J Add License flow
- Runtime-derived test data only
- Cleanup in finally