---
test_id: "LIMAS-SUD-950"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Previous Button Disabled\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Previous Button Disabled"
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

Verify that the Previous page button is disabled when on page 1.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded on page 1.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: Page 1 is displayed with pagination controls.

2. Action: Verify the Previous button is disabled.
   Expected Result: The Previous button has the disabled attribute or is not enabled.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Previous button is disabled on the first page.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not navigate between pages.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP