---
test_id: "LIMAS-SUD-1020"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search States\" → \"Case-Preserving Search Request\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search States"
action: "Case-Preserving Search Request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-search-states.spec.ts"
---

# Purpose

Verify that the search request preserves the typed case (e.g., "Chris" sent as-is) and that the server performs case-insensitive matching.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.
- A runtime-known name that exists in the list is available.

# Test Data

Use a name substring extracted from a visible user card at runtime, typed with mixed case.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Default user list loaded.

2. Action: Extract a name from a visible card, type it with intentional mixed case (e.g., capitalize only the first letter), and capture the GET request.
   Expected Result: Request URL includes `firstName={mixedCaseValue}` exactly as typed.

3. Action: Verify matching results are returned.
   Expected Result: Cards for the matching user are visible.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName` with mixed-case value
- Visible UI Result: Matching results returned despite case difference

# Expected Final Result

Search preserves the user's typed case in the request and the server matches case-insensitively.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names or search terms.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: "Chris" sent as `firstName=Chris`; results returned.