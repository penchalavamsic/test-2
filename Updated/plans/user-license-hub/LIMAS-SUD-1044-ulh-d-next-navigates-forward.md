---
test_id: "LIMAS-SUD-1044"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Next Button Navigates Forward\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Next Button Navigates Forward"
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

Verify clicking the Next button advances to the next page, updates the "Showing X–Y of Z" range, updates "Page N of M", and enables the Previous button.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.
- Total pages > 1 so Next is available.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and capture initial pagination state.
   Expected Result: Page 1, showing 1–{size} of {total}, Previous disabled, Next enabled.

2. Action: Click Next and wait for the network response.
   Expected Result: A GET /api/users/f request with page=1 (API 0-based) is sent; response status is 200.

3. Action: Verify updated pagination state.
   Expected Result: "Page 2 of {m}" visible; "Showing {size+1}–{size*2} of {total}" if not last page; Previous enabled; Next enabled (if more pages remain).

4. Action: Verify no stale cards from the previous page.
   Expected Result: All visible user card names differ from the page 1 names captured initially.

# Network Verification

- Request URL: GET /api/users/f?page=1&size={currentSize}&groupids={same}&userState=0
- HTTP Method: GET
- Expected Status: 200
- No POST/PUT/PATCH/DELETE.

# Expected Final Result

Next button correctly advances to page 2 with fresh user cards.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode page numbers, size, or total counts.
- Do not rely on fixed user names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: Next click → GET /api/users/f?page=1&size=20, "Showing 21–40 of 1823", "Page 2 of 92".