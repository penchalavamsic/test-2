---
test_id: "LIMAS-SUD-1047"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Previous Sends Decremented Page Param\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Previous Sends Decremented Page Param"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination-navigation.spec.ts"
---

# Purpose

Verify the API request on Previous click sends page={n-1} (0-based) while preserving size and groupids.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to page 2 (API page=1).

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to page 2 via Next and capture the API page parameter from that request.
   Expected Result: Last request had page=1.

2. Action: Set up a response promise for GET /api/users/f with page=0 and same size/groupids; then click Previous.
   Expected Result: The awaited response matches page=0, same size, same groupids; status 200.

3. Action: Verify the page parameter decremented from 1 to 0.
   Expected Result: URL has page=0.

# Network Verification

- Request URL: GET /api/users/f?page=0&size={unchanged}&groupids={unchanged}&userState=0
- HTTP Method: GET
- Expected Status: 200
- size and groupids unchanged.

# Expected Final Result

Previous sends a GET with page decrementing by 1, size and groupids preserved.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode any query parameter values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: Previous from page 2 → GET /api/users/f?page=0&size=20&groupids={same}&userState=0.