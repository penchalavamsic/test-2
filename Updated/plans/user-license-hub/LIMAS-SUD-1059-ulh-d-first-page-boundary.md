---
test_id: "LIMAS-SUD-1059"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"First Page Boundary State\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "First Page Boundary State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-pagination-boundaries.spec.ts"
---

# Purpose

Verify the first page boundary state: Previous is disabled, Next is enabled (when total pages > 1), showing range starts at 1, and "Page 1 of M" is displayed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.
- Total pages > 1 (verified dynamically).

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and verify total pages.
   Expected Result: Total pages > 1 (Next should be relevant).

2. Action: Check Previous button state.
   Expected Result: Previous is disabled (either HTML disabled attribute or aria-disabled="true").

3. Action: Check Next button state.
   Expected Result: Next is enabled.

4. Action: Verify "Showing 1–{size} of {total}" is the range text.
   Expected Result: Range starts at 1.

5. Action: Verify "Page 1 of {m}" is displayed.
   Expected Result: Current page is 1.

# Network Verification

No additional requests expected at boundary state — it is the initial load state.

# Expected Final Result

First page boundary has Previous disabled, Next enabled, showing range starts at 1, and page 1 of M.

# Classification

- Read-only
- Positive
- Boundary

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode page numbers or total counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: initial state — Previous disabled, Next enabled, "Showing 1–20 of 1823", "Page 1 of 92".