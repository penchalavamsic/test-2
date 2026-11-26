---
test_id: "LIMAS-SUD-927"
title: "To verify the functionality of \"User & License Hub\" → \"Navigation\" → \"Route\" → \"Sanitized Route\""
module: "User & License Hub"
page: "User & License Hub"
section: "Navigation"
control: "Route"
action: "Sanitized Route"
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

Verify that the User & License Hub page is served at the sanitized route `/users-licenses`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub via sidebar link.
   Expected Result: Page loads.

2. Action: Verify the URL pathname.
   Expected Result: The URL pathname ends with `/users-licenses`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The page route is `/users-licenses` without query string or fragment noise.

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