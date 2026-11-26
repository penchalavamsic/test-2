---
test_id: "LIMAS-SUD-1055"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"First User Selected After Previous\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "First User Selected After Previous"
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

Verify that after clicking Previous from page 2 back to page 1, the first user card on page 1 is automatically selected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on page 2 (after Next navigation).
- Total pages > 1.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to page 2 via Next.
   Expected Result: Now on page 2; first card on page 2 is selected.

2. Action: Click Previous and wait for the response.
   Expected Result: Page transition back to page 1 complete.

3. Action: Verify the first card on page 1 is selected.
   Expected Result: isUserCardSelected(0) is true; getSelectedUserCardIndex() returns 0.

4. Action: Verify no other cards on page 1 are selected.
   Expected Result: Only index 0 has green ring.

# Network Verification

GET /api/users/f with page=0; no POST/PUT/PATCH/DELETE.

# Expected Final Result

After Previous navigation, the first user on page 1 is auto-selected.

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

- Live UI observation via Playwright MCP: Previous from page 2 → back to page 1, first user auto-selected.