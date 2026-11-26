---
test_id: "LIMAS-SUD-1041"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Page Summary Text Visible\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Page Summary Text Visible"
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

Verify the "Page N of M" text is visible and matches the expected format.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: Pagination area is rendered.

2. Action: Verify the page summary text is visible.
   Expected Result: Text matching "Page \d+ of \d+" is visible.

3. Action: Read the page summary content.
   Expected Result: Text follows the "Page N of M" format where N and M are positive integers and N <= M.

# Network Verification

No additional API verification needed.

# Expected Final Result

The "Page N of M" text is visible and well-formed.

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

- Live UI observation via Playwright MCP: "Page 1 of 92" confirmed visible on initial load.