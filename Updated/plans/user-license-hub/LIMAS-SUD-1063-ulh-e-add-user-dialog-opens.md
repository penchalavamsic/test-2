---
test_id: "LIMAS-SUD-1063"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Add User Button\" → \"Click Opens Dialog\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Add User Button"
action: "Click Opens Dialog"
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

Verify that clicking the Add User button opens a dialog with role="dialog" and accessible name "Add User".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Add User button visible and enabled.

2. Action: Click the Add User button.
   Expected Result: A dialog with role="dialog" and accessible name "Add User" appears. Add User button remains visible.

# Network Verification

No API request triggered by dialog open alone.

# Expected Final Result

The Add User dialog opens and the button remains visible in the background.

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

- Live UI observation via Playwright MCP: Add User button click → dialog opens, role="dialog", accessible name "Add User".