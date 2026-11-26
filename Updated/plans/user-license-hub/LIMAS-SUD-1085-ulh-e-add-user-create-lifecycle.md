---
test_id: "LIMAS-SUD-1085"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Create Lifecycle\" → \"Create Verify Cleanup Gated\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Save Button"
action: "Create Lifecycle - Gated Behind Mutation Safety"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "User & License Hub ULH-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Not Started"
environment_variables: [
  "LIMAS_BASE_URL",
  "LIMAS_SUPER_USER_ADMIN_USER_USERNAME",
  "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD",
  "TEST_ULH_ALLOW_USER_MUTATION",
  "TEST_ULH_ADD_USER_GROUP_IDENTIFIER",
  "TEST_ULH_ADD_USER_FIRST_NAME_PREFIX",
  "TEST_ULH_ADD_USER_LAST_NAME_PREFIX",
  "TEST_ULH_ADD_USER_EMAIL_DOMAIN"
]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-add-user.spec.ts"
---

## Objective

Verify the complete Add User lifecycle — create a uniquely generated dummy user, verify the created user appears in the list with correct field values and group assignment, then clean up by deleting the same user.

This case is **gated** behind `TEST_ULH_ALLOW_USER_MUTATION=true`. If the flag is absent or set to any other value, the test must skip.

## Preconditions

- Authenticated as {access_profile}
- On the User & License Hub page (path: /users-licenses)
- `TEST_ULH_ALLOW_USER_MUTATION` is set to `true`
- `TEST_ULH_ADD_USER_GROUP_IDENTIFIER` is configured to a test-safe group
- A cleanup mechanism (UI Delete or API) is available

## Steps

1. Generate a unique run identifier (ULH_RUN_ID) at runtime (timestamp + random suffix).
2. Build synthetic First Name, Last Name, and Email using the ULH_RUN_ID and configured prefixes.
3. Open the Add User dialog.
4. Fill all required fields: First Name, Last Name, Email, and select the configured test-safe User Group.
5. Verify Save is enabled.
6. Start network request observation.
7. Click Save exactly once.
8. Wait for the create-user POST request and verify response status is 200 or 201.
9. Verify the dialog closes or a success state is shown.
10. Verify the user list refreshes.
11. Locate the newly created user by the unique Email (or Name).
12. Verify the created user's First Name, Last Name, Email, and Group match the submitted values.
13. Verify exactly one create request was sent.
14. In `finally`: delete the created user using the UI Delete flow (click Delete, confirm).
15. Verify the user no longer appears in the list.
16. Clear Search and restore default state.

## Expected Result

- One POST request to the create-user endpoint with status 200/201.
- The created user appears in the user list with correct field values.
- The created user is deleted successfully.
- No duplicate user is created.
- No existing user is modified or deleted.
- After cleanup, the default user list state is restored.

## Evidence Source

- Source-supported (MCP inspection confirmed form behavior; mutation not performed live due to missing gate config)
- The Save-enabled state was verified live: all four required fields filled → Save enabled
- The dialog close/cancel behaviors were verified live
- The User Group dropdown was verified live (137 options, "Autosar" known test-safe)

## Notes

- This test MUST check `TEST_ULH_ALLOW_USER_MUTATION` before proceeding; otherwise skip.
- The cleanup step MUST run in a `finally` block so it executes even if verification assertions fail.
- The generated email MUST be unique and collision-resistant.
- The selected group MUST be the configured `TEST_ULH_ADD_USER_GROUP_IDENTIFIER`.
- "Already deleted" is acceptable cleanup result (idempotent).