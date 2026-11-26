---
test_id: "LIMAS-SUD-1064"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Dialog Structure\" → \"Heading h2\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Dialog Structure"
action: "Heading h2"
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

Verify the Add User dialog has an h2 heading "Add User".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible.

2. Action: Locate the heading inside the dialog by role.
   Expected Result: A heading level 2 with text "Add User" is present inside the dialog.

# Network Verification

No API verification needed.

# Expected Final Result

The dialog heading is an h2 element with text "Add User".

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

- Live UI observation via Playwright MCP: Dialog contains h2 "Add User".