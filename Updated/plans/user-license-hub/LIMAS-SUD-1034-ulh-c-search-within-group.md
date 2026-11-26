---
test_id: "LIMAS-SUD-1034"
title: "To verify the functionality of \"User & License Hub\" → \"User Search & Filters\" → \"Combination\" → \"Search Within Group Filter\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search & Filters"
control: "Combination"
action: "Search Within Group Filter"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-search-filter-combination.spec.ts"
---

# Purpose

Verify that when a group filter is active, typing a search term sends a GET request with both `groupids={singleGroupId}` and `firstName={searchTerm}` — searching is scoped to the active group.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- A group filter is active on the User & License Hub.

# Test Data

Use a runtime-known group name and a name substring from within that group.

# Steps and Expected Results

1. Action: Apply a group filter, wait for filtered results.
   Expected Result: Only users in the selected group visible.

2. Action: Type a search term (a user name from within the group) and capture the GET request.
   Expected Result: GET includes both `groupids={singleGroupId}` and `firstName={searchTerm}`.

3. Action: Verify results are scoped.
   Expected Result: Visible cards are both in the selected group AND match the search term.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `groupids={singleGroupId}` AND `firstName={searchTerm}`
- Visible UI Result: Cards match both constraints

# Expected Final Result

Search within an active group filter correctly combines both parameters in the API request.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode group names, user names, or search terms.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: group applied first → search sends both `groupids` and `firstName`.