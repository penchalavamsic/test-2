---
test_id: "LIMAS-SUD-1042"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Page Summary Parsing\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Page Summary Parsing"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination-structure.spec.ts"
---

# Purpose

Verify the "Page N of M" text can be parsed into numeric currentPage and totalPages, and that currentPage <= totalPages. Note: UI page numbers are 1-based; the API page parameter is 0-based.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: Page summary is visible.

2. Action: Parse the page summary text into { currentPage, totalPages } numbers.
   Expected Result: Both are positive integers; currentPage >= 1; currentPage <= totalPages.

3. Action: Verify UI page is 1-based while the corresponding API page parameter is 0-based (API page = currentPage - 1).
   Expected Result: Initial currentPage = 1 which maps to API page=0.

# Network Verification

No additional API verification needed.

# Expected Final Result

Page summary parses correctly with 1-based UI page numbers.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode specific counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: "Page 1 of 92" on initial load (UI page=1, API page=0).