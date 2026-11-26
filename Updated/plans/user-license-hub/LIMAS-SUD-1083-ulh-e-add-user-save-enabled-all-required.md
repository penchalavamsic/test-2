---
test_id: "LIMAS-SUD-1083"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Save Button\" → \"Enabled When All Required Filled\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Save Button"
action: "Enabled When All Required Filled"
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

Verify the Save button becomes enabled once all 4 required fields (First Name, Last Name, Email, User Group) are filled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use runtime-generated First Name, Last Name, and Email values. Select a dynamically discovered User Group.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible, Save disabled.

2. Action: Fill First Name with a runtime value.
   Expected Result: Save remains disabled.

3. Action: Fill Last Name with a runtime value.
   Expected Result: Save remains disabled.

4. Action: Fill Email with a runtime value.
   Expected Result: Save remains disabled.

5. Action: Select a User Group from the dynamically discovered options.
   Expected Result: Save button is now enabled.

# Network Verification

No API verification needed (no submission performed).

# Expected Final Result

Save becomes enabled only when all 4 required fields are filled.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do NOT click Save. This test verifies button state only.
- Do not hardcode group names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: First Name + Last Name + Email + User Group → Save enabled.