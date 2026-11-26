---
test_id: "LIMAS-SUD-1052"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Total Pages Recalculated On Size Change\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Total Pages Recalculated On Size Change"
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

Verify that total pages recalculates proportionally when the page size changes: reducing page size increases total pages (ceil(total / size)).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with total > current page size.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Capture the current pagination state (total, currentSize, totalPages).
   Expected Result: All values are positive integers.

2. Action: Select a smaller page size (e.g., half of current, or discover the smallest available option).
   Expected Result: New totalPages should be greater than the original totalPages.

3. Action: Verify the new totalPages approximately equals ceil(total / newSize).
   Expected Result: totalPages is within 1 of ceil(total / newSize).

4. Action: Restore the original page size and verify totalPages returns to original.
   Expected Result: Original totalPages restored.

# Network Verification

GET requests with page=0 and corresponding sizes.

# Expected Final Result

Total pages dynamically recalculates based on page size; restoring size restores original total pages.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode any numeric values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: size 20 → 92 pages; size 10 → 183 pages (ceil(1823/10)=183).