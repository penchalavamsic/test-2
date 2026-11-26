---
test_id: "LIMAS-SUD-1057"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"License Panel Syncs After Previous\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "License Panel Syncs After Previous"
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

Verify the license panel updates to show the correct user's licenses after Previous navigation back to page 1 — license count matches and "Assigned to" matches.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on page 2 after Next navigation.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: On page 2, capture the selected user's name and badge count.
   Expected Result: License panel synced to page 2 first user.

2. Action: Click Previous and wait for the response.
   Expected Result: Back on page 1; first user auto-selected.

3. Action: Verify license panel shows licenses for the page 1 first user.
   Expected Result: Visible license count matches the badge count of the first user on page 1.

4. Action: Verify "Assigned to" on each license card matches the selected user name.
   Expected Result: All assigned-to values equal the first user's name on page 1.

# Network Verification

GET /api/users/f with page=0; no separate license request.

# Expected Final Result

License panel correctly syncs to the page 1 first user after Previous navigation.

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

- Live UI observation via Playwright MCP: after Previous, license panel synced to page 1 first user.