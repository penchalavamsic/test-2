---
test_id: "LIMAS-SUD-1046"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Next Sends Incremented Page Param\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Next Sends Incremented Page Param"
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

Verify the API request on Next click sends page={n+1} (0-based) while preserving size and groupids parameters from the current request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded (page=0 in API).

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Capture the current pagination state (size, page summary).
   Expected Result: Current UI page is 1 (API page=0).

2. Action: Set up a response promise for GET /api/users/f with page=1 and same size/groupids; then click Next.
   Expected Result: The awaited response matches page=1, same size, same groupids; status 200.

3. Action: Verify the page parameter incremented by exactly 1 from the previous request.
   Expected Result: URL has page=1 (incremented from 0).

# Network Verification

- Request URL: GET /api/users/f?page=1&size={unchanged}&groupids={unchanged}&userState=0
- HTTP Method: GET
- Expected Status: 200
- size and groupids unchanged from previous request.

# Expected Final Result

Next sends a GET with page incrementing by 1 while size and groupids stay the same.

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

- Live UI observation via Playwright MCP: Next → GET /api/users/f?page=1&size=20&groupids={same}&userState=0.