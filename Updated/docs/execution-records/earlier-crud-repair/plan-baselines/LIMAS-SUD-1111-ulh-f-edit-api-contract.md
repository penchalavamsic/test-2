---
test_id: "LIMAS-SUD-1111"
title: "To verify the functionality of "User & License Hub" -> "API Contract" -> "PUT Endpoint" -> "Update User Contract""
module: "User & License Hub"
page: "User & License Hub"
section: "API Contract"
control: "PUT Endpoint"
action: "Update User Contract"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "User & License Hub ULH-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Not Started"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-edit-user.spec.ts"
---

## Objective

Verify that the Edit User "PUT Endpoint" "Update User Contract" when interacting with the User & License Hub Edit User dialog.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER at ${LIMAS_BASE_URL}.
- On the User & License Hub page (path: /users-licenses).
- A runtime test user is available for Edit testing.

## Steps

1. Navigate to User & License Hub.
2. Restore default user list state.
3. Open the Edit User dialog for the runtime test user.
4. Interact with "PUT Endpoint" to verify "Update User Contract".
5. Verify the expected behavior as described in the title.
6. Cancel or close the dialog. Restore default state.

## Expected Result

The "PUT Endpoint" behaves as described â€” "Update User Contract".

## Evidence Source

- Live MCP inspection (dialog structure, prepopulated values, Save state, Cancel behavior verified)
- Mutation gated behind TEST_ULH_ALLOW_USER_MUTATION=true
