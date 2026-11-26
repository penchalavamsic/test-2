---
test_id: "LIMAS-SUD-942"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Container\" → \"User List Container Visibility\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Container"
action: "User List Container Visibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-list.spec.ts"
---

# Purpose

Verify that the user list container is visible and contains user cards after loading.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub and the user API response has returned.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: Page loads and users are fetched.

2. Action: Verify user cards are rendered.
   Expected Result: At least one user card is visible in the user list.

# Network Verification

- Request URL: `**/api/users/f**`
- HTTP Method: GET
- Expected Status: 200
- Visible UI Result: User cards are rendered in the list.

# Expected Final Result

The user list container renders user cards with dynamic runtime data.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not hardcode user names, emails, groups, or license counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP