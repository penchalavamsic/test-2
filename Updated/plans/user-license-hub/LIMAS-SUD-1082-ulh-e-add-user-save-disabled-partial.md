---
test_id: "LIMAS-SUD-1082"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Save Button\" → \"Disabled With Partial Required Fields\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Save Button"
action: "Disabled With Partial Required Fields"
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

Verify the Save button remains disabled when only some required fields are filled (less than all 4: First Name, Last Name, Email, User Group).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use runtime-generated First Name, Last Name, and Email values.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible, Save disabled.

2. Action: Fill First Name + Last Name only.
   Expected Result: Save remains disabled.

3. Action: Add Email.
   Expected Result: Save remains disabled (User Group still unselected).

4. Action: Fill First Name only.
   Expected Result: Save remains disabled.

5. Action: Fill Last Name only.
   Expected Result: Save remains disabled.

6. Action: Fill Email only.
   Expected Result: Save remains disabled.

# Network Verification

No API verification needed.

# Expected Final Result

Save remains disabled until all 4 required fields are filled.

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

- Live UI observation via Playwright MCP: First Name + Last Name → disabled; + Email → still disabled; needs User Group.