---
test_id: "LIMAS-SUD-1015"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search Trigger\" → \"Search Is API-Side Not Client-Side\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search Trigger"
action: "Search Is API-Side Not Client-Side"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that typing in the User Search input triggers a GET request to the `/api/users/f` endpoint — confirming search is API-side and not a client-side filter over already-loaded data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Use a runtime-known search term derived from the visible card names.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Default user list loaded via initial GET to `/api/users/f`.

2. Action: Type a search term into the User Search input and capture the next GET to `/api/users/f`.
   Expected Result: A new GET request fires with the `firstName` query parameter set to the search term.

3. Action: Verify the response status and the UI update.
   Expected Result: Response is 200; the visible user cards reflect the filtered results.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName` query parameter with the typed value
- Visible UI Result: User cards filtered to matching results

# Expected Final Result

Search is confirmed API-side — each input change triggers a new GET request to `/api/users/f`.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, search terms, or request IDs.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: typing in the User Search input triggers a GET request to `/api/users/f` with `firstName={searchTerm}`.