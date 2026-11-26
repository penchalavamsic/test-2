---
test_id: "LIMAS-SUD-926"
title: "To verify the functionality of \"User & License Hub\" → \"Navigation\" → \"Sidebar Link\" → \"Navigate to User & License Hub\""
module: "User & License Hub"
page: "User & License Hub"
section: "Navigation"
control: "Sidebar Link"
action: "Navigate to User & License Hub"
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

Verify that clicking the sidebar link navigates to the User & License Hub page.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the System User Dashboard.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Authenticate and ensure the dashboard is loaded.
   Expected Result: System User Dashboard is visible.

2. Action: Click the sidebar link for User & License Hub.
   Expected Result: The URL includes `/users-licenses`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Navigation to the User & License Hub page succeeds via the sidebar link.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not type into any search field.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP