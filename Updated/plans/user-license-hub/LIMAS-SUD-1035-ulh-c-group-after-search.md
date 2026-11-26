---
test_id: "LIMAS-SUD-1035"
title: "To verify the functionality of \"User & License Hub\" → \"User Search & Filters\" → \"Combination\" → \"Group Filter Applied After Search\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search & Filters"
control: "Combination"
action: "Group Filter Applied After Search"
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

Verify that applying a group filter after a search is already active correctly combines both parameters — the GET request includes both `firstName` and `groupids`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- A search is active on the User & License Hub.

# Test Data

Use a runtime-known search term and a runtime-known group name.

# Steps and Expected Results

1. Action: Type a search term, wait for results.
   Expected Result: Search-filtered results visible; `firstName` in request.

2. Action: Open Filters dialog, select a group, click Select.
   Expected Result: New GET fires with both `firstName={searchTerm}` AND `groupids={singleGroupId}`.

3. Action: Verify results are scoped by both criteria.
   Expected Result: Visible cards belong to the selected group and match the search term.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName={searchTerm}` AND `groupids={singleGroupId}`
- Visible UI Result: Cards satisfy both constraints

# Expected Final Result

Group filter applied after search correctly combines with the existing search term.

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

- Live UI observation via Playwright MCP: search first → group filter applied → both parameters in request.