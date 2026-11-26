---
test_id: "LIMAS-SUD-1071"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Focus Trap\" → \"Tab Cycles Within Dialog\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Focus Trap"
action: "Tab Cycles Within Dialog"
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

Verify that Tab cycles through focusable elements inside the Add User dialog without escaping to background content, and that focus returns to the first field after the last focusable element.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible, focus on First Name.

2. Action: Press Tab multiple times, checking each focused element.
   Expected Result: Each Tab moves focus to the next focusable element within the dialog (fields, buttons). Focus never leaves the dialog.

3. Action: After the last focusable element (Save button), press Tab.
   Expected Result: Focus wraps back to the first focusable element inside the dialog (First Name textbox).

# Network Verification

No API verification needed.

# Expected Final Result

Tab cycles focus within the dialog and wraps back to the first element.

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

- Live UI observation via Playwright MCP: Tab cycles through fields and buttons inside dialog, background aria-hidden.