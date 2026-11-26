---
test_id: "LIMAS-SUD-1045"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Previous Button Navigates Back\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Previous Button Navigates Back"
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

Verify clicking the Previous button from page 2 returns to page 1, restoring the original pagination state and disabling the Previous button again.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub and already navigated to page 2 via Next.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to page 2 via Next, capturing the page 1 user names first.
   Expected Result: Now on page 2; Previous is enabled.

2. Action: Click Previous and wait for the network response.
   Expected Result: A GET /api/users/f request with page=0 (API 0-based) is sent; response status 200.

3. Action: Verify pagination restored to page 1 state.
   Expected Result: "Page 1 of {m}" visible; "Showing 1–{size} of {total}" visible; Previous disabled; Next enabled.

4. Action: Verify no stale cards from page 2.
   Expected Result: All visible user card names match the original page 1 names (same order).

# Network Verification

- Request URL: GET /api/users/f?page=0&size={currentSize}&groupids={same}&userState=0
- HTTP Method: GET
- Expected Status: 200
- No POST/PUT/PATCH/DELETE.

# Expected Final Result

Previous button correctly returns to page 1 with the original user cards and disables itself.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode page numbers or user names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: Previous click → GET /api/users/f?page=0&size=20, "Showing 1–20 of 1823", "Page 1 of 92", Previous disabled.