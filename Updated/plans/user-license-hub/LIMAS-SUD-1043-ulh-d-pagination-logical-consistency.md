---
test_id: "LIMAS-SUD-1043"
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
related_script: "tests/user-license-hub/user-license-hub-pagination-structure.spec.ts"
---

# Purpose

Verify cross-field pagination consistency instead of relying on hardcoded values: the visible card count matches end - start + 1, end <= total, start >= 1, and total pages is ceil(total / pageSize).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: Pagination and user cards are rendered.

2. Action: Parse pagination summary, page summary, and count visible user cards.
   Expected Result: All values are positive integers.

3. Action: Check that visible card count equals end - start + 1.
   Expected Result: The number of rendered cards matches the showing range.

4. Action: Check that end <= total and start >= 1.
   Expected Result: The range is within valid bounds.

5. Action: Check that totalPages is approximately ceil(total / rowsPerPage).
   Expected Result: Computed total pages matches or is within 1 of the displayed totalPages (allowing for grouping/splitting).

# Network Verification

No additional API verification needed.

# Expected Final Result

All pagination fields are internally consistent without hardcoded values.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode specific counts.
- Do not compare against external data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: cross-field consistency validated dynamically.