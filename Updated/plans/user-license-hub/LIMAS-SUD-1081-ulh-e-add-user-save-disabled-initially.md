---
test_id: "LIMAS-SUD-1081"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Save Button\" → \"Initially Disabled\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Save Button"
action: "Initially Disabled"
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

Verify that the Save button is disabled when the Add User dialog first opens (all fields empty).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible, all fields empty.

2. Action: Locate the Save button and verify it is disabled.
   Expected Result: Save button present with role="button", accessible name "Save", and is disabled.

# Network Verification

No API verification needed.

# Expected Final Result

Save button is disabled when the form is empty.

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

- Live UI observation via Playwright MCP: Save disabled on empty form.