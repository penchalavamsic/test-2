---
test_id: "LIMAS-SUD-1036"
title: "To verify the functionality of \"User & License Hub\" → \"User Search & Filters\" → \"Combination\" → \"Clearing Search While Group Active\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search & Filters"
control: "Combination"
action: "Clearing Search While Group Active"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that clearing the search when a group filter is active removes only the `firstName` parameter from the request while the `groupids` filter persists — the group-scoped results remain.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Both a search and a group filter are active.

# Test Data

Apply a group filter and a search at runtime.

# Steps and Expected Results

1. Action: Apply both a group filter and a search term, wait for combined results.
   Expected Result: Combined filter results visible.

2. Action: Clear the search input, capture the GET request.
   Expected Result: GET includes `groupids={singleGroupId}` but `firstName` is empty or absent.

3. Action: Verify results.
   Expected Result: All users in the group are shown (search constraint removed); pagination reflects the group-only count; Filters badge still shows 1.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `groupids={singleGroupId}`, `firstName` empty/absent
- Visible UI Result: Group-scoped full list restored

# Expected Final Result

Clearing search with an active group filter removes the search constraint but preserves the group filter.

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

- Live UI observation via Playwright MCP: clearing search with group active → search removed, group filter persists.