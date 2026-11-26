---
test_id: "LIMAS-SUD-1054"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"First User Selected After Next\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "First User Selected After Next"
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

Verify that after clicking Next, the first user card on the new page is automatically selected (green ring visible).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.
- Total pages > 1.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify a user is selected on page 1.
   Expected Result: getSelectedUserCardIndex() returns >= 0; isUserCardSelected(0) is true.

2. Action: Click Next and wait for the response.
   Expected Result: Page transition complete; new user cards visible.

3. Action: Verify the first card on page 2 is selected.
   Expected Result: isUserCardSelected(0) is true on the new page; getSelectedUserCardIndex() returns 0.

4. Action: Verify no other cards on the page are selected.
   Expected Result: Only one card (index 0) has the green ring box-shadow.

# Network Verification

GET /api/users/f with page=1; no POST/PUT/PATCH/DELETE.

# Expected Final Result

After Next navigation, the first user on the new page is auto-selected.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names or card indices.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: after Next to page 2, first user on page 2 auto-selected with green ring.