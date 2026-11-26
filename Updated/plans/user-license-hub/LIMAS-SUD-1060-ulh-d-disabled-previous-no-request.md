---
test_id: "LIMAS-SUD-1060"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Disabled Previous Click No Request\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Disabled Previous Click No Request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination-boundaries.spec.ts"
---

# Purpose

Verify that clicking the disabled Previous button on page 1 does not trigger any new network request and does not change the page state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub on page 1.
- Previous button is disabled.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify Previous is disabled and capture the page URL and pagination state.
   Expected Result: Previous has disabled attribute; page shows "Page 1 of M".

2. Action: Set up a request counter for GET /api/users/f. Click the disabled Previous button.
   Expected Result: No new GET /api/users/f request is triggered by the click.

3. Action: Verify the pagination state and page URL are unchanged.
   Expected Result: Still on "Page 1 of M"; showing range unchanged; URL unchanged.

# Network Verification

No GET /api/users/f request triggered by clicking disabled Previous.

# Expected Final Result

Disabled Previous button is inert — clicking it triggers no request and changes nothing.

# Classification

- Read-only
- Negative
- Boundary

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode page state.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: clicking disabled Previous triggered no request; page unchanged.