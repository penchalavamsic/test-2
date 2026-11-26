---
test_id: "LIMAS-SUD-1016"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search Trigger\" → \"Enter Key Triggers Same Search Request\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search Trigger"
action: "Enter Key Triggers Same Search Request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-search.spec.ts"
---

# Purpose

Verify that pressing Enter in the search input triggers the same GET request to `/api/users/f` as typing — without double-sending.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Use a runtime-known search term.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Default user list loaded.

2. Action: Type a search term into the User Search input (which already triggers a GET), wait for that response, then press Enter.
   Expected Result: Either a single new GET fires or the same request is reused — no duplicate request is observed.

3. Action: Verify the search results remain consistent after Enter.
   Expected Result: Same filtered results as before pressing Enter.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName` query parameter
- Visible UI Result: Results unchanged after Enter

# Expected Final Result

Enter key does not cause a duplicate request — the same search behavior holds.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, search terms.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: Enter triggers the same request pattern; no distinct behavior from typing observed.