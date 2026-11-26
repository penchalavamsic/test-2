---
test_id: "LIMAS-SUD-1073"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"First Name Field\" → \"Structure and Placeholder\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "First Name Field"
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

Verify the First Name field is a required textbox with label "First Name *", placeholder "Enter first name", and empty default value.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible.

2. Action: Locate the First Name field by its label "First Name *".
   Expected Result: A textbox with role="textbox" is present.

3. Action: Check its placeholder.
   Expected Result: Placeholder is "Enter first name".

4. Action: Check its initial value.
   Expected Result: Value is empty.

5. Action: Verify the label contains an asterisk indicating required.
   Expected Result: The label text includes "*".

# Network Verification

No API verification needed.

# Expected Final Result

First Name field is a required textbox with correct placeholder and empty default value.

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

- Live UI observation via Playwright MCP: First Name field, label "First Name *", placeholder "Enter first name", empty.