---
test_id: "LIMAS-SUD-952"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Logical Consistency\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Logical Consistency"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination.spec.ts"
---

# Purpose

Verify pagination logical consistency: start ≥ 1, end ≥ start, end ≤ total, page ≤ total pages, and the computed range matches page × size expectation.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: Page 1 pagination is rendered.

2. Action: Extract pagination numbers (start, end, total, page, totalPages, rowsPerPage) and verify constraints.
   Expected Result: start ≥ 1, end ≥ start, end ≤ total, page ≤ totalPages, and end = min(page × rowsPerPage, total), start = (page - 1) × rowsPerPage + 1.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All pagination indices are mathematically consistent.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not navigate between pages.
- Do not hardcode specific counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP