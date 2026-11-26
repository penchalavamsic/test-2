---
test_id: "LIMAS-SUD-1048"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"No Stale Cards After Transition\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "No Stale Cards After Transition"
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

Verify that after navigating to a new page, all visible user cards are fresh (no stale cards from the previous page remain in the DOM).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.
- Total pages > 1.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Capture all visible user card names on page 1.
   Expected Result: At least one user card visible with a name.

2. Action: Click Next and wait for the response.
   Expected Result: New page of users loaded.

3. Action: Capture all visible user card names on page 2 and compare against page 1 names.
   Expected Result: No name from page 1 appears on page 2 (no stale cards).

4. Action: Click Previous to return to page 1 and capture names.
   Expected Result: Page 1 names match the originally captured names (no stale cards from page 2).

# Network Verification

No POST/PUT/PATCH/DELETE requests.

# Expected Final Result

Each page transition renders only fresh cards for that page; no cross-contamination.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: 20 fresh user cards on page 2, none matching page 1; page 1 restored on return.