---
test_id: "LIMAS-SUD-1040"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Summary Parsing\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Summary Parsing"
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

Verify the pagination summary text can be parsed into numeric start, end, and total values and that they follow logical constraints (start >= 1, end >= start, end <= total, end - start + 1 <= rowsPerPage).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: Pagination summary is visible.

2. Action: Parse the summary text into { start, end, total } numbers.
   Expected Result: All three values are positive integers; start >= 1; end >= start; end <= total.

3. Action: Verify that end - start + 1 <= rowsPerPage (current page size).
   Expected Result: The displayed range does not exceed one page worth of records.

# Network Verification

No additional API verification needed.

# Expected Final Result

Pagination summary parses correctly and its numeric values are logically consistent.

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

- Live UI observation via Playwright MCP: "Showing 1–20 of 1823" confirmed — start=1, end=20, total=1823, page size=20.