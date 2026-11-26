# LIMAS-SUD-2575: Mutation lifecycle is skipped unless TEST_SYSTEM_USER_ALLOW_MUTATION is set

**Module:** SYU-B — System Users Edit Assignments Dialog
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER
**Spec File:** tests/system-users/system-users-edit-assignments.spec.ts

## Objective
Verify: Mutation lifecycle is skipped unless TEST_SYSTEM_USER_ALLOW_MUTATION is set

## Steps
1. Navigate to System Users page
2. Interact with page elements
3. Assert: Mutation lifecycle is skipped unless TEST_SYSTEM_USER_ALLOW_MUTATION is set

## Expected Result
The behavior matches the test case title: Mutation lifecycle is skipped unless TEST_SYSTEM_USER_ALLOW_MUTATION is set