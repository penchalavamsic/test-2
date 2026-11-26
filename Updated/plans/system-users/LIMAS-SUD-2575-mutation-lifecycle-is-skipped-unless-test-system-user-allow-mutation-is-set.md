# LIMAS-SUD-2575: Save, verify, and restore a test user assignment

Module: System Users / Edit Assignments
Category: CRUD
Precondition: A unique disposable system user exists. Use TEST_SYSTEM_USER_EMAIL or TEST_SYSTEM_USER_NAME; otherwise look for the previously designated Test User.
Spec: tests/system-users/system-users-edit-assignments.spec.ts

## Steps
1. Confirm that the designated test user exists uniquely. Skip only if that user is absent.
2. Create a uniquely named, empty automation group through the User Groups UI.
3. Open the test user's assignments and capture the existing profiles and groups.
4. Add only the new empty group and click Update once.
5. Check the update response, reload, reopen, and verify the group persisted and profiles are unchanged.
6. In cleanup, remove only the temporary group assignment, save, reload, and verify the original assignments.
7. Delete the test-owned group and verify that it remains absent after reload.

## Expected result
The assignment is persisted and then restored. Failed requests, failed persistence, or failed cleanup are failures, never skipped or treated as passes. Existing business groups are not deleted.

## Current verification limitation
The user authorized skipping this case for now because the designated disposable user is absent. The new save/restore implementation is typechecked but cannot be called live-verified until suitable runtime data is provided.
