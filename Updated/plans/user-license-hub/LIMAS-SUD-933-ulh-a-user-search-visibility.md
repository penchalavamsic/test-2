---
test_id: "LIMAS-SUD-933"
title: "To verify the functionality of \"User & License Hub\" → \"User Controls\" → \"User Search\" → \"Visibility\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Controls"
control: "User Search"
action: "Visibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-controls.spec.ts"
---

# Purpose

Verify that the user search input is visible in the Users panel.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub.
   Expected Result: Page loads.

2. Action: Verify the user search input is visible.
   Expected Result: The search input with placeholder "Search by Name or Email" is visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The user search input is rendered and visible on page load.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not type into the search field.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP