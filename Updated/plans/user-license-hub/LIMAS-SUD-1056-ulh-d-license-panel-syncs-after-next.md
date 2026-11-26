---
test_id: "LIMAS-SUD-1056"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"License Panel Syncs After Next\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "License Panel Syncs After Next"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination-selection-sync.spec.ts"
---

# Purpose

Verify the license panel updates to show licenses for the auto-selected user after Next navigation — license count matches badge count and "Assigned to" matches the selected user name.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.
- Total pages > 1.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: On page 1, capture the selected user's name and license data.
   Expected Result: License panel shows licenses for the selected page 1 user.

2. Action: Click Next and wait for the response.
   Expected Result: Page 2 loaded; first user auto-selected.

3. Action: Verify license panel shows licenses for the new selected user.
   Expected Result: The number of visible license cards matches the badge count of the first user on page 2.

4. Action: Verify "Assigned to" on each license card matches the selected user's h3 name.
   Expected Result: Every license card's assigned-to name equals the first user's name on page 2.

# Network Verification

GET /api/users/f with page=1; no separate license request.

# Expected Final Result

License panel is synced to the auto-selected user after Next navigation.

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

- Live UI observation via Playwright MCP: after Next, license panel synced to first user on page 2.