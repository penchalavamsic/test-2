---
test_id: "LIMAS-SUD-1069"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Outside Click\" → \"Dismisses Dialog\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Outside Click"
action: "Dismisses Dialog"
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

Verify that clicking outside the dialog (on the aria-hidden backdrop) dismisses the dialog and discards field values.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use runtime-generated field values.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible.

2. Action: Fill some fields with runtime values.
   Expected Result: Fields hold the entered values.

3. Action: Click the backdrop area outside the dialog.
   Expected Result: Dialog is dismissed (not visible).

4. Action: Reopen the dialog.
   Expected Result: All fields are reset to defaults (empty, Save disabled).

# Network Verification

No API request triggered by outside click.

# Expected Final Result

Outside-click dismisses the dialog and fields are discarded.

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

- Live UI observation via Playwright MCP: Outside-click dismisses dialog, fields discarded.