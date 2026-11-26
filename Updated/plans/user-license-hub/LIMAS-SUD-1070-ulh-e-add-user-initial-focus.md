---
test_id: "LIMAS-SUD-1070"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Focus Management\" → \"Initial Focus on First Name\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Focus Management"
action: "Initial Focus on First Name"
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

Verify that when the Add User dialog opens, focus is placed on the First Name textbox.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible.

2. Action: Verify the currently focused element.
   Expected Result: The First Name textbox (with aria-label or placeholder "Enter first name") is focused.

# Network Verification

No API verification needed.

# Expected Final Result

Initial focus is on the First Name input when the dialog opens.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not submit the form.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: Focus on First Name textbox on dialog open.