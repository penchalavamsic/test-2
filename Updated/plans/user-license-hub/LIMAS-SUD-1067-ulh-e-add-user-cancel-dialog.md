---
test_id: "LIMAS-SUD-1067"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Cancel Button\" → \"Cancels Without Mutation\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Cancel Button"
action: "Cancels Without Mutation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "User & License Hub ULH-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-add-user.spec.ts"
---

# Purpose

Verify that clicking Cancel dismisses the dialog without triggering any API request and discards all field values.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use runtime-generated field values for required fields plus a known user group.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible, Save disabled.

2. Action: Fill all 4 required fields (First Name, Last Name, Email, User Group) with runtime values.
   Expected Result: Save button becomes enabled.

3. Action: Click the Cancel button.
   Expected Result: Dialog is dismissed (not visible). No POST/PUT API request is triggered.

4. Action: Reopen the dialog.
   Expected Result: All fields are reset to defaults (empty), Save is disabled.

# Network Verification

No API request triggered by Cancel. Verify no POST /api/users request is fired.

# Expected Final Result

Cancel dismisses the dialog, discards field values, and triggers no API mutation.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not submit the form.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: Cancel click → dialog closed, no API request, reopened → clean state.