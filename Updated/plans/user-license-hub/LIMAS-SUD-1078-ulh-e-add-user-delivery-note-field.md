---
test_id: "LIMAS-SUD-1078"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Delivery Note Field\" → \"Structure and Placeholder\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Delivery Note Field"
action: "Structure and Placeholder"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify the Delivery Note field is an optional textbox with label "Delivery Note" (no asterisk), placeholder "Enter delivery note", and empty default value.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible.

2. Action: Locate the Delivery Note field by its label "Delivery Note".
   Expected Result: A textbox is present.

3. Action: Check its placeholder.
   Expected Result: Placeholder is "Enter delivery note".

4. Action: Check its initial value.
   Expected Result: Value is empty.

5. Action: Verify the label does NOT contain "*".
   Expected Result: Label is "Delivery Note" without an asterisk.

# Network Verification

No API verification needed.

# Expected Final Result

Delivery Note field is an optional textbox with correct placeholder and empty default.

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

- Live UI observation via Playwright MCP: Delivery Note field, label "Delivery Note", placeholder "Enter delivery note", empty.