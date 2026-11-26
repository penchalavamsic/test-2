---
test_id: "LIMAS-SUD-1050"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Selecting Alternative Size Sends Request\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Selecting Alternative Size Sends Request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-page-size.spec.ts"
---

# Purpose

Verify that selecting a different rows-per-page value sends a GET request with the new size parameter and page=0 (resets to first page).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Discover available page sizes and pick one that differs from the current size.
   Expected Result: At least one alternative size is available.

2. Action: Set up a response promise for GET /api/users/f with the new size and page=0; select the new size.
   Expected Result: The awaited response matches the new size and page=0; response status 200.

3. Action: Verify the showing range now reflects the new page size.
   Expected Result: "Showing 1–{newSize} of {total}" visible, and visible card count equals newSize (or total if less).

# Network Verification

- Request URL: GET /api/users/f?page=0&size={newSize}&groupids={same}&userState=0
- HTTP Method: GET
- Expected Status: 200
- No POST/PUT/PATCH/DELETE.
- Page always resets to 0 on size change.

# Expected Final Result

Selecting a new rows-per-page value sends a GET with the new size and resets to the first page.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode size values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: selecting size 10 → GET /api/users/f?page=0&size=10&groupids={same}&userState=0, "Showing 1–10 of 1823".