---
test_id: "LIMAS-SUD-1022"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search States\" → \"Search Value Persists In Input\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search States"
action: "Search Value Persists In Input"
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

Verify that after performing a search (including a no-match search), the search term remains in the input field — the input is not cleared by the response.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use a runtime-known search term (matching) and a non-matching term.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Default user list loaded.

2. Action: Type a matching search term, wait for response.
   Expected Result: Search results visible; input value equals typed term.

3. Action: Clear input, type a non-matching search term, wait for response.
   Expected Result: "No users found" displayed; input value equals typed term.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName` with search value
- Visible UI Result: Input retains value after both match and no-match responses

# Expected Final Result

The search input retains the typed value after every response — match or no match.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names or search terms.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: "Chris" and "zzznoexist9999" both persisted in the input after response.