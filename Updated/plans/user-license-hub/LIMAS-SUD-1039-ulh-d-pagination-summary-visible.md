---
test_id: "LIMAS-SUD-1039"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Summary Text Visible\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Summary Text Visible"
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

Verify the pagination "Showing X–Y of Z" summary text is visible and matches the expected format.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user data loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: User cards and pagination are rendered.

2. Action: Verify the showing range text is visible.
   Expected Result: Text matching "Showing \d+–\d+ of \d+" is visible.

3. Action: Read the summary text content.
   Expected Result: Text is non-empty and follows the "Showing {start}–{end} of {total}" pattern.

# Network Verification

No additional API verification needed; the initial GET /api/users/f load covers this.

# Expected Final Result

The pagination summary displays the showing range in the expected format.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode specific counts.
- Do not navigate between pages.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: "Showing 1–20 of 1823" confirmed visible on initial load.