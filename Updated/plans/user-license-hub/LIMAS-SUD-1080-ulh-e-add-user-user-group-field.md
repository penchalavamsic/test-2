---
test_id: "LIMAS-SUD-1080"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"User Group Field\" → \"Structure and Placeholder\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "User Group Field"
action: "Structure and Placeholder"
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

Verify the User Group field is a required combobox with label "User Group *", placeholder "Select user group...", and unselected default state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible.

2. Action: Locate the User Group field by its label "User Group *".
   Expected Result: A combobox (role="combobox") is present.

3. Action: Check its placeholder or displayed text.
   Expected Result: Displays placeholder "Select user group..." or no selection.

4. Action: Verify the label contains "*" indicating required.
   Expected Result: Label includes "*".

# Network Verification

No API verification needed at this stage. Options are loaded dynamically when the combobox is expanded.

# Expected Final Result

User Group is a required combobox with placeholder and empty initial selection.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not submit the form.
- Do not hardcode group names or options.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: User Group combobox, label "User Group *", placeholder "Select user group...", unselected.