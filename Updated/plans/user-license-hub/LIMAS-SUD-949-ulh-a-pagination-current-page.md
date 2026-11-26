---
test_id: "LIMAS-SUD-949"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Current Page Info\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Current Page Info"
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

Verify that the "Page N of M" text is visible and that the current page is 1 on initial load.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: Pagination controls are rendered.

2. Action: Verify the page info text and that current page is 1.
   Expected Result: Text matching "Page 1 of \d+" is visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Page info shows current page 1 on initial load.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not navigate between pages.
- Do not hardcode total page count.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP