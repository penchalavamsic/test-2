---
test_id: "LIMAS-SUD-1106"
title: "To verify the functionality of "User & License Hub" -> "Dropdowns" -> "GDPR Consent" -> "Options and Current Value""
module: "User & License Hub"
page: "User & License Hub"
section: "Dropdowns"
control: "GDPR Consent"
action: "Options and Current Value"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "User & License Hub ULH-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-edit-user.spec.ts"
---

## Objective

Verify that the Edit User "GDPR Consent" "Options and Current Value" when interacting with the User & License Hub Edit User dialog.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER at ${LIMAS_BASE_URL}.
- On the User & License Hub page (path: /users-licenses).
- A runtime test user is available for Edit testing.

## Steps

1. Navigate to User & License Hub.
2. Restore default user list state.
3. Open the Edit User dialog for the runtime test user.
4. Interact with "GDPR Consent" to verify "Options and Current Value".
5. Verify the expected behavior as described in the title.
6. Cancel or close the dialog. Restore default state.

## Expected Result

The "GDPR Consent" behaves as described â€” "Options and Current Value".

## Evidence Source

- Live MCP inspection (dialog structure, prepopulated values, Save state, Cancel behavior verified)
- Mutation gated behind TEST_ULH_ALLOW_USER_MUTATION=true
