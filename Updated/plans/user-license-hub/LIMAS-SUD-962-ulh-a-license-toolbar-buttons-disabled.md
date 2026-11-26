---
test_id: "LIMAS-SUD-962"
title: "To verify the functionality of \"User & License Hub\" → \"License Controls\" → \"Toolbar\" → \"Download and Email Buttons Disabled\""
module: "User & License Hub"
page: "User & License Hub"
section: "License Controls"
control: "Toolbar"
action: "Download and Email Buttons Disabled"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-license-controls.spec.ts"
---

# Purpose

Verify that the Download license file and Send license file by email buttons are visible but disabled on initial load.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify the Download and Email buttons are visible and disabled.
   Expected Result: Both buttons are visible and in a disabled state.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The download and email toolbar buttons are rendered in disabled state on initial load.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not click the Download or Email buttons.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP