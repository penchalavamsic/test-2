---
test_id: "LIMAS-SUD-931"
title: "To verify the functionality of \"User & License Hub\" → \"Page Shell\" → \"Layout\" → \"Two-Panel Layout\""
module: "User & License Hub"
page: "User & License Hub"
section: "Page Shell"
control: "Layout"
action: "Two-Panel Layout"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-navigation-shell.spec.ts"
---

# Purpose

Verify that the User & License Hub page renders a two-panel layout with a Users panel and a Licenses panel.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify the main content has at least two child panels.
   Expected Result: Both a user list panel and a license panel are rendered side by side.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The main content area contains two visually distinct panels for Users and Licenses.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP