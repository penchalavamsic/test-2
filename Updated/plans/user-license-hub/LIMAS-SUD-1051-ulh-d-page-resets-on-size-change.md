---
test_id: "LIMAS-SUD-1051"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Pagination\" → \"Page Resets On Size Change\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Pagination"
action: "Page Resets On Size Change"
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

Verify that changing the rows-per-page value always resets to page 1 (API page=0), regardless of which page was active before the change.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to page 2 via Next click.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to page 2 via Next and verify not on page 1.
   Expected Result: "Page 2 of {m}" visible; Previous enabled.

2. Action: Select a different rows-per-page size.
   Expected Result: A GET request with page=0 is sent.

3. Action: Verify the page reset to 1.
   Expected Result: "Page 1 of {newTotal}" visible; Previous disabled; showing range starts at 1.

# Network Verification

- Request URL: GET /api/users/f?page=0&size={newSize}&groupids={same}&userState=0
- HTTP Method: GET
- Expected Status: 200
- page=0 confirms reset.

# Expected Final Result

Changing the page size always resets to the first page.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode page numbers or sizes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: on page 2, selecting size 10 → GET page=0&size=10, "Page 1 of 183", "Showing 1–10 of 1823".